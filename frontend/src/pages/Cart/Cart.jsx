import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../context/StoreContext";
import UserNavbar from "../../HomeUser/UserNavbar/UserNavbar.jsx";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import "../Product/Product.css";

const CartItem = ({ item, quantity, removeFromCart }) => (
  <div className="cart-items-title cart-items-item">
    <img src={`http://localhost:3000/uploads/${item.image}`} alt="" />
    <p>{item.name}</p>
    <p>Rs. {item.price}</p>
    <div>{quantity}</div>
    <p>Rs. {item.price * quantity}</p>
    <p
      className="cart-items-remove-icon"
      onClick={() => removeFromCart(item._id)}
    >
      x
    </p>
  </div>
);

const Cart = () => {
  const {
    cartItems = {},
    removeFromCart,
    getTotalCartAmount,
    isAuthenticated,
    food_list = [],
  } = useContext(StoreContext);

  const navigate = useNavigate();
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
          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <CartItem
                    item={item}
                    quantity={cartItems[item._id]}
                    removeFromCart={removeFromCart}
                  />
                  <hr />
                </div>
              );
            }
          })}
          <p>Your cart is empty.</p>
        </div>
        <div className="cat-bottom">
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
