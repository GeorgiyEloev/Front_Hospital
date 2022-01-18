import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppBar } from "@mui/material";
import logo from "../../img/logo.png";
import "./Main.scss";

const Main = () => {
  const [allRecords, setAllRecords] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    const uploadAllRecords = async () => {
      const token = localStorage.getItem("token");
      await axios
        .get("http://localhost:8000/record/allRecord", {
          headers: { authorization: token },
        })
        .then((res) => {
          setAllRecords(res.data.data);
        })
        .catch((err) => {
          localStorage.clear();
          navigation("/login");
        });
    };

    uploadAllRecords();
  }, [navigation]);

  return (
    <div className="login-main">
      <AppBar className="label-header">
        <img src={logo} alt="logo" />
        <h1>Приемы</h1>
      </AppBar>
    </div>
  );
};

export default Main;
