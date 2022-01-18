import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AppBar, TextField, Button, MenuItem, Select } from "@mui/material";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
import logo from "../../img/logo.png";
import "./Main.scss";
import DateInput from "../DateInput";

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
          switch (err.response.status) {
            case 401:
              setSnackbar({
                message: "Ошибка авторизации!!!",
                status: "error",
                errorToken: true,
              });
              handleClick();
              break;
            default:
              setSnackbar({
                message: "Ошибка чтения записей! Обновите страницу!",
                status: "warning",
                errorToken: false,
              });
              handleClick();
              break;
          }
        });
    };

    uploadAllRecords();
  }, [navigation]);

  const addNewRecord = async () => {
    await axios
      .post(
        "http://localhost:8000/record/addNewRecord",
        {
          patient,
          doctor,
          date,
          symptoms,
        },
        {
          headers: { authorization: token },
        }
      )
      .then((res) => {
        setAllRecords(res.data.data);
        setSnackbar({
          message: "УДАЧА! Запись сохранена!",
          status: "success",
          errorToken: false,
        });
        handleClick();
				setNewRecord({
					patient: "",
					doctor: "",
					date: new Date(),
					symptoms: "",
				});
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            setSnackbar({
              message: "Ошибка авторизации!!!",
              status: "error",
              errorToken: true,
            });
            handleClick();
            break;
          default:
            setSnackbar({
              message: "Ошибка новой записии! Запись не сохранена!",
              status: "warning",
              errorToken: false,
            });
            handleClick();
            break;
        }
      });
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
        <Button variant="outlined" onClick={() => exitPage()}>
          Выход
        </Button>
      </AppBar>
      <AppBar className="label-add">
        <div>
          <p>Имя:</p>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={patient}
            sx={{ backgroundColor: "white" }} //fix this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
        <div>
          <p>Врач:</p>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={doctor}
            sx={{ width: 300, backgroundColor: "white" }} //fix this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div>
          <p>Дата:</p>
          <DateInput newRecord={newRecord} setNewRecord={setNewRecord} />
        </div>
        <div>
          <p>Жалобы:</p>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={symptoms}
            sx={{ backgroundColor: "white" }} //fix this!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
        <Button variant="outlined" onClick={() => addNewRecord()}>
          Добавить
        </Button>
      </AppBar>
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
