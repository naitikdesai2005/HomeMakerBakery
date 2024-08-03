import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login.jsx";
import Homepage from "./pages/Homepage.jsx";
import BakerRegister from "./pages/BakerRegister/BakerRegister.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import HomeUser from "../../frontend/src/HomeUser/HomeUser.jsx";
import HomeBaker from "../../frontend/src/HomeBaker/HomeBaker.jsx";
import HomeAdmin from "../../frontend/src/HomeAdmin/HomeAdmin.jsx";
import PlaceOrder from "./pages/Order/Order.jsx";
import ContactForm from "./pages/Contact/Contact.jsx";
import Aboutus from "./pages/Aboutus/Aboutus.jsx";

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
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/aboutus" element={<Aboutus />} />
      </Routes>
    </>
  );
}

export default App;
