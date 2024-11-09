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
        "http://localhost:3000/api/order/baker-orders"
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
    try {
      const response = await axios.post(
        "http://localhost:3000/api/order/update-status",
        {
          orderId,
          status,
        }
      );
      if (response.data.success) {
        toast.success("Order status updated successfully.");
        fetchAllOrders();
      } else {
        toast.error("Failed to update order status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred while updating the status.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order-container">
      <h3>Order Management</h3>
      <div className="order-list">
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => {
            const totalAmount = order.items.reduce((total, item) => {
              return total + item.quantity * (item.productId.price || 0);
            }, 0);

            return (
              <div key={order._id} className="order-item">
                <div className="order-item-details">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-product-details">
                      <img
                        src={`http://localhost:3000/uploads/${item.productId.image}`}
                        alt={item.productId.name}
                        className="product-image"
                      />
                      <p className="product-name">
                        {item.productId.name} x {item.quantity}
                      </p>
                    </div>
                  ))}
                  <p className="order-item-name">
                    {order.userId.firstName} {order.userId.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.userId.address}</p>
                  </div>
                  <p className="order-item-phone">{order.userId.phone}</p>
                </div>
                <p className="order-item-amount">
                  Total: {currency}
                  {totalAmount}
                </p>
                <select
                  onChange={(e) => statusHandler(e, order._id)}
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
    </div>
  );
};

export default Order;
