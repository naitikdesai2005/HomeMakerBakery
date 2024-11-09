import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const currency = "Rs.";

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/order/baker-orders",
        { headers: { token: localStorage.getItem("token") } } // Include token for authentication
      );
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders.");
    }
    setLoading(false);
  };

  const statusHandler = async (event, orderId) => {
    const status = event.target.value;
  
    // Log the values being sent
    console.log("Updating order status:", { orderId, status });
  
    // Validate that orderId and status are defined
    if (!orderId || !status) {
      console.error("Order ID or status is missing.");
      toast.error("Order ID and status are required.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:3000/api/order/update-status",
        {
          orderId,
          status,
        },
        { headers: { token: localStorage.getItem("token") } } // Include token for authentication
      );
  
      if (response.data.success) {
        toast.success("Order status updated successfully.");
        fetchAllOrders();
      } else {
        toast.error("Failed to update order status.");
      }
    } catch (error) {
      // Log the error response for debugging
      console.error("Error updating order status:", error.response.data);
      toast.error("An error occurred while updating the status.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order-list">
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => {
          console.log("Order object:", order); // Debugging log
          return (
            <div key={order._id} className="order-item"> {/* Ensure this key is unique */}
              <div className="order-item-details">
                <p className="order-item-name">{order.user.name}</p>
                <div className="order-item-address">
                  <p>{order.user.address}</p>
                </div>
                <p className="order-item-phone">{order.user.phone}</p>
              </div>
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={item.productId} className="order-product-details"> {/* Ensure this key is unique as well */}
                    <img
                      src={`http://localhost:3000/uploads/${item.image}`}
                      alt={item.name}
                      className="product-image"
                    />
                    <p className="product-name">
                      {item.name} x {item.quantity}
                    </p>
                  </div>
                ))}
              </div>
              <p className="order-item-amount">
                Total: {currency} {order.totalPrice}
              </p>
              <select
                onChange={(e) => statusHandler(e, order._id)} // Ensure order._id is being passed correctly
                value={order.status}
                className="order-status-select"
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Order;