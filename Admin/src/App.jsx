import React, { useState } from "react";
import "./App.css";
import { Route, BrowserRouter,Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard"
import AdminNavbar from "./Pages/AdminNavbar/AdminNavbar";
import Order from "./Pages/Order/Order";

function App() {
  // const url = "http://localhost:3000";
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Homepage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} /> */}
        {/* <Route
          path="/login"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        /> */}
        
        {/* <Route
          path="/homebaker"
          element={
            isLoggedIn ? (
              <Login onLogin={() => setIsLoggedIn(true)} />
            ) : (
              <HomeBaker />
            )
          }
        /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/" element={<AdminNavbar />} />
        <Route path="/order" element={<Order/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
