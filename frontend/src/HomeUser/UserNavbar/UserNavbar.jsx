import React, { useContext, useState } from "react";
import "./UserNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../../images/assets";
import { StoreContext } from "../../pages/context/StoreContext";

const UserNavbar = () => {
  const [menu, setMenu] = useState("home");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { getTotalCartItems, logout } = useContext(StoreContext);
  const cartItemCount = getTotalCartItems();
  // const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="../../images/Logo.png" alt="" />
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
          <div className="profile-button">
            <button className="loginbutton" onClick={toggleDropdown}>
              <img src={assets.login_icon} alt="Profile" />
            </button>
            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <Link to="/myorders" className="dropdown-item">
                  Orders
                </Link>
                <a onClick={logout} className="dropdown-item">
                  Logout
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserNavbar;
