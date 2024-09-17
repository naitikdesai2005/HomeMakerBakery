import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./HeaderBaker.css";
import { assets } from "../../../images/assets"; // Assuming assets is correctly defined

const HeaderBaker = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="baker-nav">
      <img
        className="logo"
        src={"../../../images/Logo.png"} // Fix image path
        alt="Logo"
        height={"80px"}
        width={"250px"}
      />
      <button className="loginbutton" onClick={toggleDropdown}>
        <img
          className="profile"
          src={assets.login_icon} // Assuming this path is correct in assets
          alt="Profile Icon"
          height={"30px"}
          width={"30px"}
        />
      </button>
      {dropdownVisible && (
        <div className="dropdown-menu">
          <Link to="/bakerprofile">Profile</Link>
          <a onClick={handleLogout} className="dropdown-item">
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default HeaderBaker;
