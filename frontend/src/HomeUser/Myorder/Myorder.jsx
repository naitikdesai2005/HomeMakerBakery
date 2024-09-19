import React, { useContext, useEffect, useState } from "react";
import "./Myorder.css";
import axios from "axios";
import { StoreContext } from "../../pages/context/StoreContext";
import { assets } from "../../../images/assets";
import UserNavbar from "../UserNavbar/UserNavbar";
import Footer from "../../pages/Footer/Footer";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token, currency } = useContext(StoreContext);
  const url = "http://localhost:3000/";

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
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
          {data.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                {/* <img src={assets.parcel_icon} alt="" /> */}
                <p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p>
                  {currency}
                  {order.amount}.00
                </p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span> <b>{order.status}</b>
                </p>
                <button onClick={fetchOrders}>Track Order</button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;