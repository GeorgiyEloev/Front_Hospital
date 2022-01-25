import React, { useState } from "react";
import moment from "moment";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DateInput from "../Main/DateInput";
import "./FilterComponent.scss";

const FilterComponent = ({ allRecords, setFilter }) => {
  const [hiddenFilter, setHidden] = useState({
    closeFilter: "filter",
    openFilter: "filter-hidden",
  });

  const [dateFilter, setDateFilter] = useState({
    minDate: "",
    maxDate: "",
  });

  const filterDate = () => {
    const dateFirst =
      moment(minDate).isValid() &&
      new Date(minDate) >= new Date("01-01-2021") &&
      new Date(minDate) <= new Date("12-31-2022")
        ? new Date(minDate)
        : new Date("01-01-2021");
    const dateLast =
      moment(maxDate).isValid() &&
      new Date(maxDate) <= new Date("12-31-2022") &&
      new Date(maxDate) >= new Date("01-01-2021")
        ? new Date(maxDate)
        : new Date("12-31-2022");
    setFilter(
      allRecords.filter(
        (record) =>
          new Date(record.date) >= dateFirst &&
          new Date(record.date) <= dateLast
      )
    );
  };

  const { closeFilter, openFilter } = hiddenFilter;
  const { minDate, maxDate } = dateFilter;

  return (
    <>
      <div className={closeFilter}>
        <p>Добавить фильтр по дате:</p>
        <AddBoxIcon
          onClick={() => {
            setDateFilter({
              minDate: "",
              maxDate: "",
            });
            setHidden({
              closeFilter: "filter-hidden",
              openFilter: "filter-open",
            });
          }}
        />
      </div>
      <div className={openFilter}>
        <div className="filter">
          <p>С:</p>
          <DateInput
            addClass="filter-date"
            value={minDate}
            handlChange={(event) => {
              setDateFilter({
                maxDate,
                minDate: event,
              });
            }}
          />
        </div>
        <div className="filter">
          <p>По:</p>
          <DateInput
            addClass="filter-date"
            value={maxDate}
            handlChange={(event) => {
              setDateFilter({
                maxDate: event,
                minDate,
              });
            }}
          />
        </div>
        <div className="filter">
          <Button
            variant="outlined"
            className="button-filter"
            onClick={() => filterDate()}
          >
            Фильтровать
          </Button>
        </div>
        <DeleteOutlineIcon
          className="icon-delete-filter"
          onClick={() => {
            setFilter([]);
            setHidden({ closeFilter: "filter", openFilter: "filter-hidden" });
          }}
        />
      </div>
    </>
  );
};

export default FilterComponent;
