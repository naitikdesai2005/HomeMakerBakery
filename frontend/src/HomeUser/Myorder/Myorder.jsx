import React, { useContext, useEffect, useState } from "react";
import "./Myorder.css";
import axios from "axios";
import { StoreContext } from "../../pages/context/StoreContext";
import UserNavbar from "../UserNavbar/UserNavbar";
import Footer from "../../pages/Footer/Footer";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token, currency } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/order/user-orders",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setData(response.data.orders);
      } else {
        console.error("Fetch orders error:", response.data.message);
      }
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <>
      <UserNavbar />
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((order, index) => (
              <div key={index} className="my-orders-order">
                <p>
                  {order.items.map((item, idx) => (
                    <span key={idx}>
                      {item.name} x {item.quantity}
                      {idx < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <p>
                  {currency}
                  {order.totalPrice}.00
                </p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>
                <button onClick={fetchOrders}>Track Order</button>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
