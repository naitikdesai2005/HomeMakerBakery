import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <h3>Sweet</h3>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="navbar-menu">
          <a href="home">Home</a>
          <a href="about">About</a>
          <a href="services">Services</a>
          <a href="contact">Contact</a>
          <a className="login-button" href="/signup">
            Login/Signup
          </a>
          <a className="login-button" href="/BakerRegister">
            Register as Baker
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
