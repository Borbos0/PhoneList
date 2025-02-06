import { useState } from "react";
import "../../styles/dropDown.css";
import arrowIcon from "../../assets/markup.svg";

export default function Dropdown({ options, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

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
              className={`dropdown-item ${
                selected === option.value ? "selected" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
