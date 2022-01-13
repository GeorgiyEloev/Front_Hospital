import React from "react";
import { AppBar, Box, TextField, Container, Button } from "@mui/material";
import logo from "../../img/logo.png";
import Vector from "../../img/Vector.png";
import "./Login.scss";

const Login = () => {
  return (
    <div className="login-main">
      <AppBar className="label-header">
        <img src={logo} alt="logo" />
        <h1>Войти в систему</h1>
      </AppBar>
      <Container className="container-style">
        <img src={Vector} alt="Vector" className="img-vector" />
        <Box className="box-style">
          <h1>Войти в систему</h1>
          <p>Login:</p>
          <TextField id="outlined-required" label="Login" />
          <p>Password:</p>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <div className="group-button">
            <Button variant="text">Text</Button>
            <Button variant="outlined">Outlined</Button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
