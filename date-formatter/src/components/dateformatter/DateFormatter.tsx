import React from "react";
import {
  dateFormatterContainerStyles,
  headContainerStyles,
} from "../../style.css";
import Dropdown from "../dropdown/Dropdown";
import CalendarIcon from "../icons/CalendarIcon";
import Divider from "../styles/Divider";

function DateFormatter() {
  return (
    <div className={dateFormatterContainerStyles}>
      <div className={headContainerStyles}>
        <h1>Today's Date</h1>
        <CalendarIcon />
      </div>
      <Divider />
      <Dropdown />
    </div>
  );
}

export default DateFormatter;
