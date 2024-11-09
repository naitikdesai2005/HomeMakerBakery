import React, { useState } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Admindash from "./Pages/AdminDash";
import Bakers from "./Pages/Bakers/Bakers";
import Users from "./Pages/Users/Users";
import "primereact/resources/themes/saga-blue/theme.css"; // Or any other theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admindash />} />
          <Route path="/bakers" element={<Bakers />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
