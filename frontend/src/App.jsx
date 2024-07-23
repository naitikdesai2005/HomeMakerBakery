import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login.jsx";
import Homepage from "./pages/Homepage.jsx";
import BakerRegister from "./pages/BakerRegister/BakerRegister.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import HomeUser from "./pages/HomeUser/HomeUser.jsx";
import HomeBaker from "./pages/HomeBaker/HomeBaker.jsx";
import HomeAdmin from "./pages/HomeAdmin/HomeAdmin.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bakerRegister" element={<BakerRegister />} />
        <Route path="/homeuser" element={<HomeUser />} />
        <Route path="/homebaker" element={<HomeBaker />} />
        <Route path="/homeadmin" element={<HomeAdmin />} />
      </Routes>
    </>
  );
}

export default App;
