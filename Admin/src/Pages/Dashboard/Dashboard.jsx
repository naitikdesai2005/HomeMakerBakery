import React, { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import { FaUser, FaBreadSlice, FaShoppingCart } from "react-icons/fa";
import "./Dashboard.css";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Dashboard = () => {
  const [colors, setColors] = useState({
    users: "",
    bakers: "",
    orders: "",
  });

  useEffect(() => {
    setColors({
      users: getRandomColor(),
      bakers: getRandomColor(),
      orders: getRandomColor(),
    });
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="dashboard-container">
        <Sidebar />
        <div className="dashboard-content">
          <div className="box" style={{ backgroundColor: colors.users }}>
            <div className="box-content">
              <FaUser className="icons" />
              <div className="text">
                <h3>Users</h3>
                <p>123</p>
              </div>
            </div>
          </div>
          <div className="box" style={{ backgroundColor: colors.bakers }}>
            <div className="box-content">
              <FaBreadSlice className="icons" />
              <div className="text">
                <h3>Bakers</h3>
                <p>56</p>
              </div>
            </div>
          </div>
          <div className="box" style={{ backgroundColor: colors.orders }}>
            <div className="box-content">
              <FaShoppingCart className="icons" />
              <div className="text">
                <h3>Orders</h3>
                <p>210</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
