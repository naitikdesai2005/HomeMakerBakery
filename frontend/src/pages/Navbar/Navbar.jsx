import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <h3>Sweet</h3>
        </div>
        {/* <div className="navbar-search">
          <input type="text" placeholder="Search..." />
        </div> */}
        <div className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <a
            href="#Aboutus"
            onClick={() => setMenu("About")}
            className={menu === "About" ? "active" : ""}
          >
            About
          </a>
          <a
            href="#Products"
            onClick={() => setMenu("Products")}
            className={menu === "Products" ? "active" : ""}
          >
            Products
          </a>
          <a
            href="#Contact"
            onClick={() => setMenu("Contact")}
            className={menu === "Conatct" ? "active" : ""}
          >
            Contact
          </a>
          <a className="login-button" href="/signup">
            Login/Signup
          </a>
          <a className="registration-button" href="/bakerRegister">
            Register as Baker
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
