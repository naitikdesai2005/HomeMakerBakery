import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login.jsx";
import Homepage from "./pages/Homepage.jsx";
import { useState } from "react";
 import Navbar from "./pages/Navbar/Navbar.jsx";
import BakerRegister from "./pages/BakerRegister/BakerRegister.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bakerRegister" element={<BakerRegister />} />
      </Routes>
    </>
  );
}

export default App;
