import React, { useState } from "react";
import "./Bakers.css";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const Bakers = () => {
  const bakersList = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      active: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      active: false,
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "456-789-1234",
      active: true,
    },
    {
      id: 4,
      name: "Lucy Brown",
      email: "lucy@example.com",
      phone: "654-321-9876",
      active: false,
    },
    {
      id: 5,
      name: "Emily White",
      email: "emily@example.com",
      phone: "111-222-3333",
      active: true,
    },
    {
      id: 6,
      name: "David Lee",
      email: "david@example.com",
      phone: "444-555-6666",
      active: true,
    },
    {
      id: 7,
      name: "Sarah Green",
      email: "sarah@example.com",
      phone: "777-888-9999",
      active: false,
    },
    {
      id: 8,
      name: "Daniel King",
      email: "daniel@example.com",
      phone: "222-333-4444",
      active: true,
    },
    {
      id: 9,
      name: "Laura Black",
      email: "laura@example.com",
      phone: "333-444-5555",
      active: false,
    },
    {
      id: 10,
      name: "Michael Blue",
      email: "michael@example.com",
      phone: "666-777-8888",
      active: true,
    },
    {
      id: 11,
      name: "Jessica Brown",
      email: "jessica@example.com",
      phone: "999-000-1111",
      active: false,
    },
    {
      id: 12,
      name: "Paul Adams",
      email: "paul@example.com",
      phone: "555-666-7777",
      active: true,
    },
    {
      id: 13,
      name: "Grace Miller",
      email: "grace@example.com",
      phone: "111-222-4444",
      active: true,
    },
    {
      id: 14,
      name: "Tom Moore",
      email: "tom@example.com",
      phone: "555-888-9999",
      active: false,
    },
    {
      id: 15,
      name: "Anna Martin",
      email: "anna@example.com",
      phone: "222-111-5555",
      active: true,
    },
    {
      id: 16,
      name: "Ryan Davis",
      email: "ryan@example.com",
      phone: "888-999-7777",
      active: false,
    },
    {
      id: 17,
      name: "Eva White",
      email: "eva@example.com",
      phone: "000-555-1111",
      active: true,
    },
    {
      id: 18,
      name: "Aaron Scott",
      email: "aaron@example.com",
      phone: "333-111-6666",
      active: false,
    },
    {
      id: 19,
      name: "Linda Walker",
      email: "linda@example.com",
      phone: "999-555-4444",
      active: true,
    },
    {
      id: 20,
      name: "James Evans",
      email: "james@example.com",
      phone: "888-222-3333",
      active: true,
    },
  ];

  const [visibleBakers, setVisibleBakers] = useState(bakersList.slice(0, 4));
  const [showAll, setShowAll] = useState(false);

  const toggleStatus = (id) => {
    const updatedBakers = visibleBakers.map((baker) =>
      baker.id === id ? { ...baker, active: !baker.active } : baker
    );
    setVisibleBakers(updatedBakers);
  };

  const handleViewMore = () => {
    navigate("/baker-details");
  };

  const navigate = useNavigate();

  const graphData = [
    { month: "January", bakers: 5 },
    { month: "February", bakers: 6 },
    { month: "March", bakers: 4 },
    { month: "April", bakers: 7 },
    { month: "May", bakers: 8 },
    { month: "June", bakers: 9 },
    { month: "July", bakers: 5 },
    { month: "August", bakers: 10 },
    { month: "September", bakers: 6 },
    { month: "October", bakers: 8 },
    { month: "November", bakers: 7 },
    { month: "December", bakers: 9 },
  ];

  return (
    <>
      <AdminNavbar />
      <div className="layout">
        <Sidebar />
        <div className="container">
          <table className="baker-table">
            <thead>
              <tr>
                <th>Baker Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleBakers.map((baker) => (
                <tr key={baker.id}>
                  <td>{baker.name}</td>
                  <td>{baker.email}</td>
                  <td>{baker.phone}</td>
                  <td>{baker.active ? "Active" : "Inactive"}</td>
                  <td>
                    <button
                      className={
                        baker.active ? "deactivate-btn" : "activate-btn"
                      }
                      onClick={() => toggleStatus(baker.id)}
                    >
                      {baker.active ? "❌" : "✔️"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="view-more-container">
            <button className="view-more-btn" onClick={handleViewMore}>
              View More »»
            </button>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={graphData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f5f5f5",
                    border: "none",
                    borderRadius: "10px",
                  }}
                  itemStyle={{ color: "#333" }}
                />
                <Legend />
                <Bar dataKey="bakers" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bakers;
