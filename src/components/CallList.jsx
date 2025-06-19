import React, { useState } from "react";
import "../styles/callList.css";
import incomingIcon from "../assets/incomingCall.svg";
import outgoingIcon from "../assets/outgoingCall.svg";
import {
  formatPhoneNumber,
  getRatingClass,
  formatDuration,
  groupCallsByDate,
  getHumanDateLabel,
} from "./utils/utils";
import useCallsData from "./hooks/useCallsData";
import LoadingSpinner from "./common/Loader";
import NoData from "./common/NoData";
import arrowIcon from "../assets/markdown.svg";
import DropDown from "./common/DropDown";

const CallList = () => {
  const [filterType, setFilterType] = useState("all");
  const [selectedRange, setSelectedRange] = useState(3);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const options = [
    { label: "Все типы", value: "all" },
    { label: "Входящие", value: "incoming" },
    { label: "Исходящие", value: "outgoing" },
  ];

  const getDateRange = () => {
    let fromDate, toDate;
    if (selectedRange === "custom") {
      fromDate = startDate;
      toDate = endDate;
    } else {
      fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - selectedRange);
      toDate = new Date();
    }
    return { fromDate, toDate };
  };
  const { fromDate, toDate } = getDateRange();
  const { calls, loading, audioUrls } = useCallsData(
    fromDate.toISOString().split("T")[0],
    toDate.toISOString().split("T")[0],
    filterType
  );
  const filteredCalls = calls.filter((call) => {
    let filterCondition = true;

    return (
      filterCondition &&
      (filterType === "all" ||
        call.in_out === (filterType === "incoming" ? 1 : 0))
    );
  });

  const groupedCalls = groupCallsByDate(filteredCalls);
  
  if (loading) return <LoadingSpinner />;
  if (!filteredCalls.length) return <NoData />;

  return (
    <div className="container">
      <div className="filters">
        <DropDown
          type="type"
          options={options}
          selected={options.find((option) => option.value === filterType)?.label}
          onChange={(option) => setFilterType(option.value)}
        />
        <DropDown
          type="date"
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </div>
      <div className="table">
        <table className="calls-table">
          <thead>
            <tr>
              <th>Тип</th>
              <th>
                Время <img src={arrowIcon} alt="arrow" className="arrow" />
              </th>
              <th>Сотрудник</th>
              <th>Звонок</th>
              <th>Источник</th>
              <th>Оценка</th>
              <th>
                Длительность{" "}
                <img src={arrowIcon} alt="arrow" className="arrow" />
              </th>
            </tr>
          </thead>
          <tbody>
            {groupedCalls.map(group => (
              <React.Fragment key={group.date}>
                <tr className="date-row">
                  <td colSpan={7}>
                    <div className="date-group-label">
                      <span className="group-date">{getHumanDateLabel(group.date)}</span>
                      <span className="group-count">{group.calls.length}</span>
                    </div>
                  </td>
                </tr>
                {group.calls.map(call => (
                  <tr key={call.id}>
                    <td>
                      <img
                        src={call.in_out === 1 ? incomingIcon : outgoingIcon}
                        alt={call.in_out === 1 ? "Входящий" : "Исходящий"}
                        className="call-icon"
                      />
                    </td>
                    <td>
                      {new Date(call.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td>
                      <img
                        src={call.person_avatar}
                        alt="Аватар"
                        className="avatar"
                      />
                    </td>
                    <td>{formatPhoneNumber(call.partner_data.phone)}</td>
                    <td className="name-partner">{call.partner_data.name}</td>
                    <td>
                      <span className={`rating ${getRatingClass(call.rating)}`}>
                        {call.rating}
                      </span>
                    </td>
                    <td>
                      {audioUrls[call.id] ? (
                        <audio controls>
                          <source src={audioUrls[call.id]} type="audio/mpeg" />
                          Ваш браузер не поддерживает аудиоэлемент.
                        </audio>
                      ) : (
                        formatDuration(call.time)
                      )}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CallList;
