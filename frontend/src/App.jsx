import React, { useState } from "react";
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
import Product from "./pages/Product/Product.jsx";
import Menu from "./pages/menu/Menu.jsx";
import ProductDisplay from "./pages/ProductDisplay/ProductDisplay.jsx";
import AddItems from "./HomeBaker/AddItems/AddItems.jsx";
import ListItems from "./HomeBaker/ListItems/ListItems.jsx";
import Profile from "./HomeUser/Profile/Profile.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import userOrder from "./HomeUser/UserOrders/UserOrder.jsx";
import UserOrder from "./HomeUser/UserOrders/UserOrder.jsx";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="/bakerRegister" element={<BakerRegister />} />
        <Route path="/homeuser" element={<HomeUser />} />
        <Route
          path="/homebaker"
          element={
            isLoggedIn ? (
              <Login onLogin={() => setIsLoggedIn(true)} />
            ) : (
              <HomeBaker />
            )
          }
        />
        <Route path="/homeadmin" element={<HomeAdmin />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/product" element={<Product />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/productdisplay" element={<ProductDisplay />} />
        <Route path="/additem" element={<AddItems />} />
        <Route path="/listitem" element={<ListItems />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/userOrder" element={<UserOrder />} />
      </Routes>
    </>
  );
}

export default App;
