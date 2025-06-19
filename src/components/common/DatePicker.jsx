import React, { useState } from "react";
import CalendarIcon from "../../assets/calendar.svg";
import LeftIcon from "../../assets/markleft.svg";
import RightIcon from "../../assets/markright.svg";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datePicker.css";

const RANGES = [
  { label: "3 дня", value: 3 },
  { label: "Неделя", value: 7 },
  { label: "Месяц", value: 30 },
  { label: "Год", value: 365 },
  { label: "Указать даты", value: "custom" },
];

export default function DateRangeSelector({
  selectedRange,
  setSelectedRange,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  fromDate,
  toDate,
}) {
  const [open, setOpen] = useState(false);

  const shiftRange = (direction) => {
    let newFrom, newTo;
    if (selectedRange === "custom") {
      const diff = Math.abs(endDate - startDate);
      newFrom = new Date(startDate.getTime() + direction * diff);
      newTo = new Date(endDate.getTime() + direction * diff);
      setStartDate(newFrom);
      setEndDate(newTo);
    } else {
      const days = Number(selectedRange);
      newFrom = new Date(fromDate);
      newFrom.setDate(newFrom.getDate() + direction * days);
      newTo = new Date(toDate);
      newTo.setDate(newTo.getDate() + direction * days);
    }
  };

  const selectedLabel =
    RANGES.find((r) => r.value === selectedRange)?.label ||
    RANGES[0].label;

  return (
    <div className="date-range-selector">
      <button className="range-btn" onClick={() => setOpen((o) => !o)}>
        <img src={CalendarIcon} alt="Календарь" className="icon" />
        <span className="label">{selectedLabel}</span>
      </button>
      <button className="arrow left" onClick={() => shiftRange(-1)}>
        <img src={LeftIcon} alt="назад" />
      </button>
      <button className="arrow right" onClick={() => shiftRange(1)}>
        <img src={RightIcon} alt="вперёд" />
      </button>
      {open && (
        <div className="range-dropdown">
          {RANGES.map((range) => (
            <div
              key={range.value}
              className={
                "dropdown-item" +
                (selectedRange === range.value ? " selected" : "")
              }
              onClick={() => {
                setSelectedRange(range.value);
                setOpen(false);
              }}
            >
              {range.label}
            </div>
          ))}
          {selectedRange === "custom" && (
            <div className="date-picker-inline">
              <ReactDatePicker
                selected={startDate}
                onChange={setStartDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd/MM/yyyy"
              />
              <ReactDatePicker
                selected={endDate}
                onChange={setEndDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="dd/MM/yyyy"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
