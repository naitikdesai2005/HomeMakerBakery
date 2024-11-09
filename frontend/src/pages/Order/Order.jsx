import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";
import { StoreContext } from "../context/StoreContext";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import UserNavbar from "../../HomeUser/UserNavbar/UserNavbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const PlaceOrder = () => {
  const { getTotalCartAmount, isAuthenticated, token, food_list, cartItems } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const decode = jwtDecode(token);
  const u_id = decode.id;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id]) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      userId: u_id,
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      address: data.street,
      phone: data.phone,
      items: orderItems,
    };

    try {
      let response = await axios.post(
        "http://localhost:3000/api/order/create",
        orderData,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.href = session_url;
      } else {
        alert("Error creating order: " + response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order.");
    }
  };

  return (
    <>
      {isAuthenticated ? <UserNavbar /> : <Navbar />}
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-field">
            <input
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
              required
            />
            <input
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email address"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.street}
            name="street"
            type="text"
            placeholder="Street"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.phone}
            name="phone"
            type="text"
            placeholder="Phone"
            required
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>Rs. {getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Rs. {getTotalCartAmount() === 0 ? 0 : 40}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  Rs.{" "}
                  {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}
                </b>
              </div>
            </div>
            <button type="submit">
              PROCEED TO PAY
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default PlaceOrder;
