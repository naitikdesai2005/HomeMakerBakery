import React from "react";
import { assets } from "../../../images/assets";
import "./Sidebar.css";

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <div
          className="sidebar-option"
          onClick={() => setActiveComponent("add")}
        >
          <img src={assets.add_icon} alt="Add Items" />
          <p>Add Items</p>
        </div>
        <div
          className="sidebar-option"
          onClick={() => setActiveComponent("list")}
        >
          <img src={assets.order_icon} alt="List Items" />
          <p>List Items</p>
        </div>
        <div
          className="sidebar-option"
          onClick={() => setActiveComponent("orders")}
        >
          <img src={assets.order_icon} alt="Orders" />
          <p>Orders</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
