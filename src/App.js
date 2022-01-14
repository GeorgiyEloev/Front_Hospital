import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<p>registration</p>} />
      <Route path="/main" element={<p>main</p>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
