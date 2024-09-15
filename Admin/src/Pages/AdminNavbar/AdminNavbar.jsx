import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AdminNavbar.css";
import { assets } from "../../../../frontend/images/assets"; // Assuming assets is correctly defined

const AdminNavbar = () => {
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
    <div className="admin-nav">
      <img
        className="logo"
        src={("../../../../Image/1.jpg")}  // Fix image path
        alt="Logo"
        height={"80px"}
        width={"250px"}
      />
      <button className="loginbutton1" onClick={toggleDropdown}>
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
          <Link to="/adminProfile">
            Profile
          </Link>
          <a onClick={handleLogout} className="dropdown-item">
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
