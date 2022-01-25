import React, { useState } from "react";
import moment from "moment";
import { Button } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DateInput from "../Main/DateInput";

const FilterComponent = ({ allRecords, setFilter }) => {
  const [hiddenFilter, setHidden] = useState({
    closeFilter: "sort",
    openFilter: "sort-hidden",
  });

  const [dateFilter, setDateFilter] = useState({
    minDate: "",
    maxDate: "",
  });

  const filterDate = () => {
    const dateFirst = moment(minDate).format();
    console.log(dateFirst.inValid());
    setFilter(
      allRecords.filter(
        (record) =>
          new Date(record.date) >= new Date(minDate) &&
          new Date(record.date) <= new Date(maxDate)
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
            setHidden({ closeFilter: "sort-hidden", openFilter: "sort" });
          }}
        />
      </div>
      <div className={openFilter}>
        <div className="sort">
          <p>С:</p>
          <DateInput
            value={minDate}
            handlChange={(event) => {
              setDateFilter({
                maxDate,
                minDate: event,
              });
            }}
          />
        </div>
        <div className="sort">
          <p>По:</p>
          <DateInput
            value={maxDate}
            handlChange={(event) => {
              setDateFilter({
                maxDate: event,
                minDate,
              });
            }}
          />
        </div>
        <div className="sort">
          <Button
            variant="outlined"
            className="button-add"
            onClick={() => filterDate()}
          >
            Фильтровать
          </Button>
        </div>
        <DeleteOutlineIcon
          onClick={() => {
            setFilter([]);
            setHidden({ closeFilter: "sort", openFilter: "sort-hidden" });
          }}
        />
      </div>
    </>
  );
};

export default FilterComponent;
