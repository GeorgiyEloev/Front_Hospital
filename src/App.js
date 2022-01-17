import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import "./App.scss";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/main" element={<Main />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
