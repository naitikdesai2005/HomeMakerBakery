import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../context/StoreContext";
import UserNavbar from "../../HomeUser/UserNavbar/UserNavbar.jsx";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { assets } from "../../../images/assets";
import { useNavigate } from "react-router-dom";
import "../Product/Product.css";

const Cart = ({ id, image }) => {
  const {
    cartItems = {},
    removeFromCart,
    addToCart,
    deleteFromCart,
    getTotalCartAmount,
    isAuthenticated,
    food_list = [],
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const url = "http://localhost:3000";
  const [emptyCartMessage, setEmptyCartMessage] = useState(false);

  const handleCheckout = () => {
    if (getTotalCartAmount() === 0) {
      setEmptyCartMessage(true);
    } else {
      setEmptyCartMessage(false);
      navigate("/order");
    }
  };

  return (
    <>
      {isAuthenticated ? <UserNavbar /> : <Navbar />}
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          <br />
          {/* Corrected: Wrapped food_list.map in curly braces */}
          {food_list.map((item, index) => {
            const quantity = cartItems[item._id] || 0;
            if (quantity > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url + "/uploads/" + item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>Rs. {item.price}</p>
                    <div className="quantity-control">
                      <button
                        onClick={() => addToCart(item._id)}
                        className="quantity-button"
                      >
                        ➕
                      </button>
                      <p>{quantity}</p>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="quantity-button"
                      >
                        ➖
                      </button>
                    </div>
                    <p>Rs. {item.price * quantity}</p>
                    <button
                      onClick={() => deleteFromCart(item._id)}
                      className="cross"
                    >
                      <img src={assets.cross_icon} alt="Remove item" />
                    </button>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>Rs. {getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Rs. {getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  Rs.{" "}
                  {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                </b>
              </div>
            </div>
            {emptyCartMessage && (
              <h2 className="empty-cart-message">Your cart is empty😒</h2>
            )}
            <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Cart;
