import React, { useState } from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AdminNavbar from "./Pages/AdminNavbar/AdminNavbar";
import Order from "./Pages/Order/Order";
import Bakers from "./Pages/Bakers/Bakers";
import Users from "./Pages/Users/Users";
import AdminProfile from "./Pages/AdminProfile/AdminProfile";
import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import AllBaker from "./Pages/AllBaker/Allbaker";

function App() {
  // const url = "http://localhost:3000";
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<AdminNavbar />} />
          <Route path="/order" element={<Order />} />
          <Route path="/bakers" element={<Bakers />} />
          <Route path="/users" element={<Users />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/baker-details" element={<AllBaker />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
