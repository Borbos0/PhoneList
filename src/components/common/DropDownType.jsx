import { useState } from "react";
import "../../styles/dropDown.css";
import arrowIcon from "../../assets/markup.svg";

export default function DropDownType({ options, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selected}
        <img
          src={arrowIcon}
          alt="arrow"
          className={`arrow ${isOpen ? "up" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdown-item ${selected === option.label ? "selected" : ""}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
