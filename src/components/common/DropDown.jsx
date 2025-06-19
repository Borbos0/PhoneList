import DropDownType from "./DropDownType";
import DatePicker from "./DatePicker";

export default function DropDown(props) {
  if (props.type === "type") {
    return (
      <DropDownType
        options={props.options}
        selected={props.selected}
        onChange={props.onChange}
      />
    );
  }

  if (props.type === "date") {
    return (
      <DatePicker
        selectedRange={props.selectedRange}
        setSelectedRange={props.setSelectedRange}
        startDate={props.startDate}
        endDate={props.endDate}
        setStartDate={props.setStartDate}
        setEndDate={props.setEndDate}
      />
    );
  }

  return null;
}
