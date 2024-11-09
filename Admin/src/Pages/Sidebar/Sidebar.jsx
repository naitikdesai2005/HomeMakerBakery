import React from "react";
import {
  BellDot,
  Settings,
  Lock,
  BarChart2,
  Grid,
  Calendar,
  PieChart,
} from "lucide-react";

const Sidebar = ({ visible }) => {
  return (
    <div
      className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg flex flex-col py-8 space-y-6 transition-all duration-300 ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-center mb-8">
        <div className="w-10 h-10 bg-blue-500 rounded-lg" />
      </div>

      <nav className="flex flex-col space-y-4 w-full px-8">
        <a
          href="/"
          className="flex items-center text-gray-500 font-semibold hover:text-blue-700 transition-colors px-4 py-2 rounded-lg"
        >
          <Grid className="w-6 h-6 mr-4" />
          <span className="text-lg">Dashboard</span>
        </a>
        <a
          href="/bakers"
          className="flex items-center text-gray-500 hover:text-blue-700 transition-colors px-4 py-2 rounded-lg"
        >
          <BarChart2 className="w-6 h-6 mr-4" />
          <span className="text-lg">Bakers</span>
        </a>
        <a
          href="/users"
          className="flex items-center text-gray-500 hover:text-blue-700 transition-colors px-4 py-2 rounded-lg"
        >
          <PieChart className="w-6 h-6 mr-4" />
          <span className="text-lg">Users</span>
        </a>
        <a
          href="#"
          className="flex items-center text-gray-500 hover:text-blue-700 transition-colors px-4 py-2 rounded-lg"
        >
          <Grid className="w-6 h-6 mr-4" />
          <span className="text-lg">Orders</span>
        </a>
        <a
          href="#"
          className="flex items-center text-gray-500 hover:text-blue-700 transition-colors px-4 py-2 rounded-lg"
        >
          <Calendar className="w-6 h-6 mr-4" />
          <span className="text-lg">Logout</span>
        </a>
        {/* <a
          href="#"
          className="flex items-center text-gray-500 hover:text-blue-700 transition-colors px-4 py-2 rounded-lg relative"
        >
          <PieChart className="w-6 h-6 mr-4" />
          <span className="text-lg">Messages</span>
          <span className="absolute right-4 bg-red-100 text-red-500 text-xs rounded-full px-2 py-0.5">
            49
          </span>
        </a>
        <a
          href="#"
          className="flex items-center text-gray-500 hover:text-blue-700 transition-colors px-4 py-2 rounded-lg"
        >
          <BellDot className="w-6 h-6 mr-4" />
          <span className="text-lg">Notification</span>
        </a>
        <a
          href="#"
          className="flex items-center text-gray-500 hover:text-blue-700 transition-colors px-4 py-2 rounded-lg"
        >
          <Settings className="w-6 h-6 mr-4" />
          <span className="text-lg">Settings</span>
        </a>
        <a
          href="#"
          className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors px-4 py-2 rounded-lg"
        >
          <Lock className="w-6 h-6 mr-4" />
          <span className="text-lg">Sign In</span>
        </a>
        <a
          href="#"
          className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors px-4 py-2 rounded-lg"
        >
          <Grid className="w-6 h-6 mr-4" />
          <span className="text-lg">Sign Up</span>
        </a> */}
      </nav>
    </div>
  );
};

export default Sidebar;
