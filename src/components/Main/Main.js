import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AppBar, TextField, Button, MenuItem, Select } from "@mui/material";
import DateInput from "./DateInput";
import TableRecords from "../TableRecords/TableRecords";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
import logo from "../../img/logo.png";
import "./Main.scss";

const Main = () => {
  const [allRecords, setAllRecords] = useState([]);

  const [newRecord, setNewRecord] = useState({
    patient: "",
    doctor: "",
    date: new Date(),
    symptoms: "",
  });

  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    status: "",
    errorToken: false,
  });

  const [checkDate, setCheckDate] = useState(false);

  const navigation = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const tokenEffect = localStorage.getItem("token");
    const uploadAllRecords = async () => {
      await axios
        .get("http://localhost:8000/record/allRecord", {
          headers: { authorization: tokenEffect },
        })
        .then((res) => {
          setAllRecords(res.data.data);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            snackbarParams("Ошибка авторизации!!!", "error", true);
          } else {
            snackbarParams(
              "Ошибка чтения записей! Обновите страницу!!!!",
              "warning",
              false
            );
          }
        });
    };
    uploadAllRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const snackbarParams = (message, status, errorToken) => {
    setSnackbar({
      message,
      status,
      errorToken,
    });
    handleClick();
  };

  const addNewRecord = async () => {
    let newDate = moment(date).format("YYYY-MM-DD");
    if (patient !== "") {
      if (doctor !== "") {
        if (symptoms !== "") {
          if (
            (date >= new Date("01-01-2021") &&
              date <= new Date("12-31-2022")) ||
            checkDate
          ) {
            if (checkDate) {
              newDate = moment().format("YYYY-MM-DD");
            }
            await axios
              .post(
                "http://localhost:8000/record/addNewRecord",
                {
                  patient,
                  doctor,
                  date: newDate,
                  symptoms,
                },
                {
                  headers: { authorization: token },
                }
              )
              .then((res) => {
                setAllRecords(res.data.data);
                if (checkDate) {
                  snackbarParams(
                    "Запись сохранена! Но дата заменена на текущую!",
                    "warning",
                    false
                  );
                } else {
                  snackbarParams("УДАЧА! Запись сохранена!", "success", false);
                }
                setNewRecord({
                  patient: "",
                  doctor: "",
                  date: new Date(),
                  symptoms: "",
                });
                setCheckDate(false);
              })
              .catch((err) => {
                switch (err.response.status) {
                  case 401:
                    snackbarParams("Ошибка авторизации!!!", "error", true);
                    break;
                  default:
                    snackbarParams(
                      "Ошибка новой записии! Запись не сохранена!",
                      "warning",
                      false
                    );
                    break;
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
      snackbarParams("Поле имени паценнта пустое!", "warning", false);
    }
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const exitPage = () => {
    localStorage.clear();
    navigation("/login");
  };

  const doctors = [
    "Кириллов Алан Валерьевич",
    "Комиссаров Гаянэ Валерьянович",
    "Крылов Родион Оскарович",
    "Волкова Нина Аристарховна",
    "Громова Августа Семеновна",
    "Ковалёв Лукьян Аристархович",
    "Волкова Алина Аристарховна",
  ];

  const { patient, doctor, date, symptoms } = newRecord;
  const { message, status, errorToken } = snackbar;

  return (
    <div className="main">
      <AppBar className="label-header">
        <img src={logo} alt="logo" />
        <h1>Приемы</h1>
        <Button
          variant="outlined"
          className="button-exit"
          onClick={() => exitPage()}
        >
          Выход
        </Button>
      </AppBar>
      <AppBar className="label-add">
        <div className="group-input">
          <p>Имя:</p>
          <TextField
            className="input-mui"
            id="outlined-basic"
            variant="outlined"
            value={patient}
            onChange={(event) =>
              setNewRecord({
                patient: event.target.value,
                doctor,
                date,
                symptoms,
              })
            }
          />
        </div>
        <div className="group-input">
          <p>Врач:</p>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="input-mui select-input"
            value={doctor}
            onChange={(event) =>
              setNewRecord({
                patient,
                doctor: event.target.value,
                date,
                symptoms,
              })
            }
          >
            {doctors.map((item, index) => {
              return (
                <MenuItem
                  className="input-mui select-input"
                  key={index}
                  value={item}
                >
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
            newRecord={newRecord}
            setNewRecord={setNewRecord}
          />
        </div>
        <div className="group-input">
          <p>Жалобы:</p>
          <TextField
            id="outlined-basic"
            variant="outlined"
            className="input-mui"
            value={symptoms}
            onChange={(event) =>
              setNewRecord({
                patient,
                doctor,
                date,
                symptoms: event.target.value,
              })
            }
          />
        </div>
        <Button
          className="button-add"
          variant="outlined"
          onClick={() => addNewRecord()}
        >
          Добавить
        </Button>
      </AppBar>
      <TableRecords allRecords={allRecords} setAllRecords={setAllRecords} />
      {errorToken ? (
        <SnackbarComponent
          open={open}
          status={status}
          message={message}
          funClose={exitPage}
        />
      ) : (
        <SnackbarComponent
          open={open}
          status={status}
          message={message}
          funClose={handleClose}
        />
      )}
    </div>
  );
};

export default Main;
