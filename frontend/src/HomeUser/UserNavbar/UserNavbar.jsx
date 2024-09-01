import React, { useContext, useState } from "react";
import "./UserNavbar.css";
import { Link } from "react-router-dom";
import { assets } from "../../../images/assets";
import { StoreContext } from "../../pages/context/StoreContext";

const UserNavbar = () => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartItems } = useContext(StoreContext);
  const cartItemCount = getTotalCartItems();

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="../../images/1.jpg" alt="" />
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
            className={menu === "Conatct" ? "active" : ""}
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
              {/* <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div> */}
            </div>
          </div>
          <div className="profile-button">
          <a className="loginbutton" href="/profile">
            <img src={assets.login_icon} alt="" />
          </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserNavbar;
