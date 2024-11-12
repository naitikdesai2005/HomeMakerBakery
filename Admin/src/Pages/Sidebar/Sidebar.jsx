import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleLogout = () => {
    // Here you could also clear any auth tokens or user data as necessary
    navigate("/"); // Redirect to login page
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full w-64 bg-[#ffffff] shadow-xl flex flex-col py-8 space-y-6 transition-all duration-300 ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-center mb-8">
        <img src="../../Image/Logo.png" alt="Logo" className="h-20 w-60 rounded-lg" />
      </div>

      <nav className="flex flex-col space-y-4 w-full px-8">
        <a
          href="/"
          className="flex items-center text-gray-700 font-semibold hover:text-[#a0522d] transition-colors px-4 py-2 rounded-lg"
        >
          <Grid className="w-6 h-6 mr-4" />
          <span className="text-lg">Dashboard</span>
        </a>
        <a
          href="/bakers"
          className="flex items-center text-gray-700 hover:text-[#a0522d] transition-colors px-4 py-2 rounded-lg"
        >
          <BarChart2 className="w-6 h-6 mr-4" />
          <span className="text-lg">Bakers</span>
        </a>
        <a
          href="/users"
          className="flex items-center text-gray-700 hover:text-[#a0522d] transition-colors px-4 py-2 rounded-lg"
        >
          <PieChart className="w-6 h-6 mr-4" />
          <span className="text-lg">Users</span>
        </a>
        <a
          href="#"
          className="flex items-center text-gray-700 hover:text-[#a0522d] transition-colors px-4 py-2 rounded-lg"
        >
          <Grid className="w-6 h-6 mr-4" />
          <span className="text-lg">Orders</span>
        </a>
        
        <a
          href="/messages"
          className="flex items-center text-gray-700 hover:text-[#a0522d] transition-colors px-4 py-2 rounded-lg relative"
        >
          <PieChart className="w-6 h-6 mr-4" />
          <span className="text-lg">User's Messages</span>
          <span className="absolute right-4 bg-[#fafaf9] text-[#a0522d] text-xs rounded-full px-2 py-0.5">
            49
          </span>
        </a>
        <a
          href="#"
          onClick={handleLogout}
          className="flex items-center text-gray-700 hover:text-[#a0522d] transition-colors px-4 py-2 rounded-lg"
        >
          <Calendar className="w-6 h-6 mr-4" />
          <span className="text-lg">Logout</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
