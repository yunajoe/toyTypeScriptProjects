import { changeFormatter } from "@/redux/reducer/dateFormatterSlice";
import { RootState } from "@/redux/store";
import { handleDropDownChange } from "@/utils/date";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "redux";
import { dropdown, dropdownContainerStyles, menu } from "./dropdown.css";

function Dropdown() {
  const dispatch: Dispatch = useDispatch();

  const dateFormat = useSelector(
    (state: RootState) => state.dateformatter.formatValue
  );
  const dateValue = useSelector(
    (state: RootState) => state.dateformatter.dateValue
  );
  const dateLetter = handleDropDownChange(dateFormat, dateValue);
  const handleChangeFormatter = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(changeFormatter(e.target.value));
    },
    [dispatch]
  );
  return (
    <div className={dropdownContainerStyles}>
      <select
        name="dropdown"
        id="dropdown"
        className={dropdown}
        onChange={handleChangeFormatter}
      >
        <option value="Day, Month, Year">Day, Month, Year</option>
        <option value="Year, Month, Day">Year, Month, Day</option>
        <option value="Month, Day, Year, Hours, Minutes">
          Month, Day, Year, Hours, Minutes
        </option>
      </select>
      <p className={menu}>{dateLetter}</p>
    </div>
  );
}

export default Dropdown;
