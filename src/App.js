import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login"
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* <Route path="">
      </Route>*/}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
