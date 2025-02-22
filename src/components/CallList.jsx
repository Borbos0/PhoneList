import React, { useState } from "react";
import "../styles/callList.css";
import incomingIcon from "../assets/incomingCall.svg";
import outgoingIcon from "../assets/outgoingCall.svg";
import Dropdown from "./common/DropDown";
import {
  formatPhoneNumber,
  getRatingClass,
  formatDuration,
} from "./utils/utils";
import useCallsData from "./hooks/useCallsData";
import LoadingSpinner from "./common/Loader";
import NoData from "./common/NoData";
import arrowIcon from "../assets/markdown.svg";

const CallList = () => {
  const { calls, loading, audioUrls } = useCallsData();
  const [filterType, setFilterType] = useState("all");

  const options = [
    { label: "Все типы", value: "all" },
    { label: "Входящие", value: "incoming" },
    { label: "Исходящие", value: "outgoing" },
  ];

  const filteredCalls = calls.filter((call) => {
    let filterCondition = true;

    return (
      filterCondition &&
      (filterType === "all" ||
        call.in_out === (filterType === "incoming" ? 1 : 0))
    );
  });

  if (loading) return <LoadingSpinner />;
  if (!filteredCalls.length) return <NoData />;

  return (
    <div className="container">
      <div className="filters">
        <Dropdown
          options={options}
          selected={
            options.find((option) => option.value === filterType)?.label ||
            "Все типы"
          }
          onChange={(option) => setFilterType(option.value)}
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
            {filteredCalls.map((call) => (
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CallList;
