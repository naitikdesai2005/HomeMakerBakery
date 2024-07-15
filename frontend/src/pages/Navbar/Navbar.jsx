import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container">
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
          <button className="login-button">
            <Link to="/signup">Login/Signup</Link>
          </button>
          &nbsp;
          <button className="register-button">
            <Link to="/register">Register as a Baker</Link>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
