import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { assets } from "../../../images/assets";
import { StoreContext } from "../context/StoreContext";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartItems } = useContext(StoreContext);
  const cartItemCount = getTotalCartItems();

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="../../images/Logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="navbar-menu">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={menu === "home" ? "active" : ""}
          >
            Home
          </Link>
          <Link
            to="/aboutus"
            onClick={() => setMenu("About")}
            className={menu === "About" ? "active" : ""}
          >
            About
          </Link>
          <a
            href="#menu"
            onClick={() => setMenu("Product")}
            className={menu === "Product" ? "active" : ""}
          >
            Products
          </a>
          <Link
            to="/contact"
            onClick={() => setMenu("Contact")}
            className={menu === "Contact" ? "active" : ""}
          >
            Contact
          </Link>
        </div>
        <div className="nav">
          <div className="navbar-right">
            <div className="navbar-cart-icon">
              <Link to="/cart">
                <img src={assets.basket_icon} alt="Cart" height={"60px"} />
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </Link>
            </div>
          </div>
          <div className="nav-login">
            <a className="login-button" href="/login">
              Login
            </a>
          </div>
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
