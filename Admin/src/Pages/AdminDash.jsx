import React, { useState } from "react";
import {
  Bell,
  Menu,
  Search,
  MoreVertical,
  RefreshCw,
  Share2,
  Download,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import Sidebar from "./Sidebar/Sidebar";
import RecentOrders from "./RecentOrder/Recentorder";

const DashboardInterface = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const data = [
    { time: "10am", value: 50000 },
    { time: "11am", value: 35000 },
    { time: "12pm", value: 60000 },
    { time: "1pm", value: 45000 },
    { time: "2pm", value: 85000 },
    { time: "3pm", value: 55000 },
    { time: "4pm", value: 45000 },
    { time: "5pm", value: 35000 },
    { time: "6pm", value: 45000 },
    { time: "7pm", value: 65000 },
  ];

  const stats = [
    { title: "Save Products", value: "178+", icon: "🍞" },
    { title: "Stock Products", value: "20+", icon: "🥐" },
    { title: "Sales Products", value: "190+", icon: "🍪" },
    { title: "Job Application", value: "12+", icon: "🧁" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 via-orange-50 to-orange-100">
      {/* Sidebar */}
      <Sidebar visible={isSidebarVisible} />

      <div className={`flex-1 p-6 transition-all duration-300 ${isSidebarVisible ? "ml-64" : ""}`}>
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
              className="w-8 h-8 mr-4 text-brown-800"
            >
              <Menu className="w-8 h-8 text-brown-500" />
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-lg border border-cream-200 bg-cream-100 text-brown-600 placeholder-brown-400"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-brown-500" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-brown-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                2
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-brown-100" />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-cream-100 p-6 rounded-xl shadow-md">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{stat.icon}</span>
                <div>
                  <div className="text-2xl font-bold text-brown-800">{stat.value}</div>
                  <div className="text-brown-500 text-sm">{stat.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Line Chart */}
          <div className="bg-cream-100 p-6 rounded-xl lg:col-span-3 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-brown-800">Reports</h2>
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 hover:bg-cream-200 rounded-full"
                >
                  <MoreVertical className="w-5 h-5 text-brown-500" />
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg border border-cream-200">
                    <button className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-cream-50">
                      <RefreshCw className="w-4 h-4 text-brown-500" />
                      <span>Refresh</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-cream-50">
                      <Download className="w-4 h-4 text-brown-500" />
                      <span>Export</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-cream-50">
                      <Share2 className="w-4 h-4 text-brown-500" />
                      <span>Share</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="50%" stopColor="#F97316" />
                    <stop offset="100%" stopColor="#DC2626" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fill: "#9CA3AF", fontSize: 12 }} dy={10} />
                <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} tickFormatter={(value) => `${value / 1000}K`} dx={-10} />
                <Line type="monotone" dataKey="value" stroke="url(#colorGradient)" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: "#F97316" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Analytics Circle Chart */}
          <div className="bg-cream-100 p-6 rounded-xl lg:col-span-1 flex flex-col items-center shadow-md">
            <h2 className="text-brown-700 text-lg font-semibold mb-4">Analytics</h2>
            <div className="relative w-40 h-40 rounded-full bg-cream-200 flex items-center justify-center">
              <div className="absolute w-40 h-40 rounded-full border-8 border-brown-300 border-r-orange-400 border-b-orange-500 border-l-transparent" />
              <div className="absolute text-center">
                <span className="text-2xl font-bold text-brown-700">80%</span>
                <p className="text-brown-500">Transactions</p>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-orange-400 mr-2"></span>
                <span className="text-brown-500">Sale</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                <span className="text-brown-500">Distribute</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>
                <span className="text-brown-500">Return</span>
              </div>
            </div>
          </div>
        </div>
        <RecentOrders />
      </div>
    </div>
  );
};

export default DashboardInterface;
