import React, { useState } from 'react';
import './Bakers.css'; // Import the CSS file
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from 'react-router-dom';

const Bakers = () => {
  // Static list of bakers
  const [bakers, setBakers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', active: false },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '456-789-1234', active: true },
    { id: 4, name: 'Lucy Brown', email: 'lucy@example.com', phone: '654-321-9876', active: false },
  ]);

  // Toggle Active/Deactive Status
  const toggleStatus = (id) => {
    const updatedBakers = bakers.map(baker => 
      baker.id === id ? { ...baker, active: !baker.active } : baker
    );
    setBakers(updatedBakers);
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
          {/* <h2 className="title">Baker List</h2> */}
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
              {bakers.map(baker => (
                <tr key={baker.id}>
                  <td>{baker.name}</td>
                  <td>{baker.email}</td>
                  <td>{baker.phone}</td>
                  <td>{baker.active ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button
                      className={baker.active ? 'deactivate-btn' : 'activate-btn'}
                      onClick={() => toggleStatus(baker.id)}
                    >
                      {baker.active ? '❌' : '✔️'}
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
        </div>
      </div>
    </>
  );
};

export default Bakers;
