import React from "react";
import DatePicker from "react-datepicker";
import { useFilters } from "../../hooks/useFilters";
import styles from "./styles.module.css";

import "react-datepicker/dist/react-datepicker.css";

export const Filters = (params) => {
  const [state, action] = useFilters();
  const onCheckboxChange = (e) => {
    action.showFolderOnly(e.target.checked);
  };

  const handleDateSelect = (e) => {
    console.log(e);
    const dateUTC = e && e.getTime();
    action.filterByDate(dateUTC);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.showFolders}>
        <input
          id="showFiles"
          type="checkbox"
          checked={state.showFolderOnly}
          onChange={onCheckboxChange}
        />
        <label htmlFor="showFiles">Show folders only</label>
      </div>
      <div className={styles.datePicker}>
        <DatePicker
          placeholderText="Click to select a date"
          selected={state.date}
          isClearable
          onChange={handleDateSelect} //when day is clicked
        />
      </div>
    </div>
  );
};
