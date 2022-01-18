import React from "react";
import { TextField } from "@mui/material";
import {
  DesktopDatePicker,
  AdapterDateFns,
  LocalizationProvider,
} from "@mui/lab";

const DateInput = ({ newRecord, setNewRecord }) => {
  const { name, doctor, date, complaints } = newRecord;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        inputFormat={"dd/MM/yyyy"}
        minDate={new Date("01-01-2021")}
        maxDate={new Date("12-31-2022")}
        name="date"
        value={date}
        onChange={(event) => {
          setNewRecord({
            name,
            doctor,
            date: event,
            complaints,
          });
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
