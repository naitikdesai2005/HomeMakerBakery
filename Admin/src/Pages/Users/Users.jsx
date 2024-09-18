import React, { useState } from 'react';
import './Users.css'; // Import the CSS file
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from 'react-router-dom';

const Users = () => {
  // Static list of bakers
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', No_of_order: '3' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', No_of_order: '3' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', No_of_order: '3' },
    { id: 4, name: 'Lucy Brown', email: 'lucy@example.com', No_of_order: '3'},
  ]);

  // Toggle Active/Deactive Status
  const toggleStatus = (id) => {
    const updatedBakers = users.map(user => 
      user.id === id ? { ...user, active: !user.active } : user
    );
    setUsers(updatedUsers);
  };

  // Navigation hook
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/bakers-details'); // Navigate to the new page
  };

  return (
    <>
      <AdminNavbar />
      <div className="layout">
        <Sidebar />
        <div className="container">
          {/* <h2 className="title">Users List</h2> */}
          <table className="baker-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>No of Order</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.No_of_order}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="view-more-container">
            <button className="view-more-btn" onClick={handleViewMore}>
              View More »»
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
