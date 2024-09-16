// Sidebar.js
import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { FaHome, FaClipboardList, FaUserFriends, FaBox, FaChartBar } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" activeClassName="active">
              <FaHome className="icon1" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/order" activeClassName="active">
              <FaClipboardList className="icon1" />
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/bakers" activeClassName="active">
              <FaUserFriends className="icon1" />
              <span>Bakers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" activeClassName="active">
              <FaBox className="icon1" />
              <span>Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics" activeClassName="active">
              <FaChartBar className="icon1" />
              <span>Analytics</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
