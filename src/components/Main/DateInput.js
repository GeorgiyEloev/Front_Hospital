import React from "react";
import { TextField } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const DateInput = ({ newRecord, setNewRecord, setCheckDate }) => {
  const { patient, doctor, date, symptoms } = newRecord;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        inputFormat={"dd/MM/yyyy"}
        minDate={new Date("01-01-2021")}
        maxDate={new Date("12-31-2022")}
        name="date"
        className="input-mui"
        value={date}
        onChange={(event) => {
          setCheckDate(false);
          setNewRecord({
            patient,
            doctor,
            date: event,
            symptoms,
          });
        }}
        renderInput={(params) => (
          <TextField {...params} className="input-mui" />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;
