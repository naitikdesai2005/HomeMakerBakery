import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch order data from the backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/ordersData');
        
        // Check if the response is successful
        if (response.data.status) {
          // Map data to extract only required fields
          const filteredOrders = response.data.data.map(order => ({
            email: order.email,
            address: order.address,
            totalPrice: order.totalPrice,
            status: order.status,
          }));
          
          setOrders(filteredOrders);
        } else {
          setError("Orders data not found");
        }
      } catch (e) {
        setError("Something went wrong");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Order List</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Address</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.email}</td>
              <td>{order.address}</td>
              <td>{order.totalPrice}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
