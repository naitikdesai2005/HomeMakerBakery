import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderForm = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phone: "",
  });
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch cart items from your backend
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/api/cart"); // Update with the actual endpoint
        if (response.data.success) {
          setCartItems(response.data.items); // Adjust based on your response structure
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/order/create", {
        ...orderDetails,
        userId: localStorage.getItem("userId"), // Adjust based on your app structure
        items: cartItems,
      });

      if (response.data.success) {
        window.location.href = response.data.session_url; // Redirect to Stripe checkout
      } else {
        console.error("Error creating order:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Order Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            value={orderDetails.firstname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={orderDetails.lastname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={orderDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={orderDetails.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={orderDetails.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Place Order"}
        </button>
      </form>

      {orderSuccess && <p>{orderSuccess}</p>}
    </div>
  );
};

export default OrderForm;
