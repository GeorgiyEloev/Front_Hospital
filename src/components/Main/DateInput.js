import React from "react";
import { TextField } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const DateInput = ({ value, handlChange, addClass }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        inputFormat={"dd/MM/yyyy"}
        minDate={new Date("01-01-2021")}
        maxDate={new Date("12-31-2022")}
        name="date"
        className={addClass}
        value={value ? value : ""}
        onChange={(event) => handlChange(event)}
        renderInput={(params) => <TextField {...params} className={addClass} />}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
