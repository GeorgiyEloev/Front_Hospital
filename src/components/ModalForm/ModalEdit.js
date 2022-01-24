import React, { useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  Box,
  AppBar,
  TextField,
  Button,
  MenuItem,
  Select,
  Modal,
} from "@mui/material";
import DateInput from "../Main/DateInput";
import "./ModalForm.scss";

const ModalEdit = ({
  open,
  openModal,
  idEdit,
  recordEdit,
  setAllRecords,
  snackbarParams,
  doctors,
  setRecordEdit,
}) => {
  const [checkDate, setCheckDate] = useState(false);

  const token = localStorage.getItem("token");

  const { patient, doctor, date, symptoms } = recordEdit;

  const editRecord = async () => {
    recordEdit.date = moment(date).format("YYYY-MM-DD");
    if (patient !== "") {
      if (doctor !== "") {
        if (symptoms !== "") {
          if (
            (new Date(date) >= new Date("01-01-2021") &&
              new Date(date) <= new Date("12-31-2022")) ||
            checkDate
          ) {
            if (checkDate) {
              recordEdit.date = moment().format("YYYY-MM-DD");
            }
            await axios
              .patch(
                "http://localhost:8000/record/changeRecord",
                { _id: idEdit, ...recordEdit },
                {
                  headers: { authorization: token },
                }
              )
              .then((res) => {
                setAllRecords(res.data.data);
                if (checkDate) {
                  snackbarParams(
                    "Запись изменина! Но дата заменена на текущую!",
                    "warning",
                    false
                  );
                } else {
                  snackbarParams("УДАЧА! Запись изменина!", "success", false);
                }
                setCheckDate(false);
                openModal(false);
              })
              .catch((err) => {
                if (err.response.status === 401) {
                  snackbarParams("Ошибка авторизации!!!", "error", true);
                  setCheckDate(false);
                  openModal(false);
                } else {
                  snackbarParams(
                    "Ошибка редактирования записи! Запись не изменина!",
                    "warning",
                    false
                  );
                  setCheckDate(false);
                  openModal(false);
                }
              });
          } else {
            setCheckDate(true);
            snackbarParams(
              "Не верная дата! Дата должна быть в диапазоне от 01/01/2021 до 31/12/2022",
              "warning",
              false
            );
          }
        } else {
          snackbarParams("Не указаны жалобы!", "warning", false);
        }
      } else {
        snackbarParams("Не выбран врач!", "warning", false);
      }
    } else {
      snackbarParams("Поле имени пацента пустое!", "warning", false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="box-style">
          <AppBar className="header-title">
            <h1>Изменить прием</h1>
          </AppBar>
          <Box className="box-small">
            <div className="group-input">
              <p>Имя:</p>
              <TextField
                className="input-mui"
                id="outlined-basic"
                variant="outlined"
                value={patient}
                onChange={(event) => {
                  setCheckDate(false);
                  setRecordEdit({
                    patient: event.target.value,
                    doctor,
                    date,
                    symptoms,
                  });
                }}
              />
            </div>
            <div className="group-input">
              <p>Врач:</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="input-mui"
                value={doctor}
                onChange={(event) => {
                  setCheckDate(false);
                  setRecordEdit({
                    patient,
                    doctor: event.target.value,
                    date,
                    symptoms,
                  });
                }}
              >
                {doctors.map((item, index) => {
                  return (
                    <MenuItem className="input-mui" key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className="group-input">
              <p>Дата:</p>
              <DateInput
                className="input-mui"
                newRecord={recordEdit}
                setNewRecord={setRecordEdit}
                setCheckDate={setCheckDate}
              />
            </div>
            <div className="group-input">
              <p>Жалобы:</p>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="input-mui"
                value={symptoms}
                onChange={(event) => {
                  setCheckDate(false);
                  setRecordEdit({
                    patient,
                    doctor,
                    date,
                    symptoms: event.target.value,
                  });
                }}
              />
            </div>
          </Box>
          <AppBar className="header-end">
            <Button
              variant="outlined"
              onClick={() => {
                setCheckDate(false);
                openModal(false);
              }}
            >
              Cancel
            </Button>
            <Button variant="outlined" onClick={() => editRecord()}>
              Save
            </Button>
          </AppBar>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEdit;