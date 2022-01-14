import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Box,
  TextField,
  Container,
  Button,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import logo from "../../img/logo.png";
import Vector from "../../img/Vector.png";
import "./Login.scss";

const Login = () => {
  const [dataLogin, dataLoginEdit] = useState({
    login: "",
    password: "",
  });

  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    message: "",
    status: "",
  });

  const navigation = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Alert = React.forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const state = {
    vertical: "top",
    horizontal: "center",
  };

  const { message, status } = snackbar;
  const { vertical, horizontal } = state;
  const { login, password } = dataLogin;

  const passwordRegular = password.match(/^(?=.*\d)[a-z\d]{6,}$/gi);
  const loginRegular = login.match(/^[a-z\d]{6,}$/gi);

  const loginSystem = async () => {
    if (loginRegular) {
      if (passwordRegular) {
        await axios
          .post("http://localhost:8000/user/authorizationUser", {
            login: login.trim(),
            password: password.trim(),
          })
          .then((results) => {
            navigation("/main");
            localStorage.setItem("token", results.data.data.token);
          })
          .catch((err) => {
            setSnackbar({
              message: "Неверный логин или пароль!!!",
              status: "error",
            });
            dataLoginEdit({
              login: "",
              password: "",
            });
            handleClick();
          });
      } else {
        setSnackbar({
          message: `Длина пароля не меньше 6 символов. 
						Все символы латинского алфавита. 
						Пароль должен содержать обязательно хотя бы одно число.!!!`,
          status: "warning",
        });
        dataLoginEdit({
          login: login,
          password: "",
        });
        handleClick();
      }
    } else {
      setSnackbar({
        message: `Длина логина не меньше 6 символов. 
					Все символы латинского алфавита или цифры!!!`,
        status: "warning",
      });
      dataLoginEdit({
        login: "",
        password: password,
      });
      handleClick();
    }
  };

  return (
    <div className="login-main">
      <AppBar className="label-header">
        <img src={logo} alt="logo" />
        <h1>Войти в систему</h1>
      </AppBar>
      <Container className="container-style">
        <img
          src={Vector}
          alt="Vector"
          className="img-vector"
        />
        <Box className="box-style">
          <div className="group-login">
            <h1>Войти в систему</h1>
            <p>Login:</p>
            <TextField
              id="outlined-required"
              value={login}
              onChange={(event) =>
                dataLoginEdit({
                  login: event.target.value,
                  password: password,
                })
              }
            />
            <p>Password:</p>
            <TextField
              hiddenLabel
              id="outlined-password-input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) =>
                dataLoginEdit({
                  login: login,
                  password: event.target.value,
                })
              }
            />
          </div>
          <div className="group-button">
            <Button
              className="button-style"
              variant="outlined"
              onClick={() => loginSystem()}
            >
              Войти
            </Button>
            <Button
              className="button-style"
              variant="text"
              onClick={() => navigation("/registration")}
            >
              Зарегистрироваться
            </Button>
          </div>
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={status} className="alert-style">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
