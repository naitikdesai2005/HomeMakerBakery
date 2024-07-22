import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { assets } from "../../../images/assets";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to='/'><h3>Sweet</h3></Link>
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
            href="#menu"
            onClick={() => setMenu("Product")}
            className={menu === "Product" ? "active" : ""}
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
        </div>
        <div className="nav">
          <div className="navbar-right">
            <div className="navbar-search-icon">
              <Link to='/cart'>
                <img src={assets.basket_icon} alt="" height={"60px"} />
              </Link>
            </div>
          </div>
          <a className="login-button" href="/signup">
            <img src={assets.login_icon} alt="" />
          </a>
          <div className="nav-regis">
            <a className="registration-button" href="/bakerRegister">
              Register as Baker
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
