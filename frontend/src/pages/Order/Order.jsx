import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";
import { StoreContext } from "../context/StoreContext";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import UserNavbar from "../../HomeUser/UserNavbar/UserNavbar";

const PlaceOrder = () => {
  const { getTotalCartAmount, isAuthenticated } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleProceedToPay = (event) => {
    event.preventDefault(); // Prevent form from submitting

    // Check if the form is valid
    const form = event.target.closest("form");
    if (form.checkValidity()) {
      if (isAuthenticated) {
        navigate("/payment"); // Navigate to payment if authenticated
      } else {
        navigate("/login"); // Navigate to login if not authenticated
      }
    } else {
      form.reportValidity(); // This will trigger the browser's validation UI
    }
  };

  return (
    <>
      {isAuthenticated ? <UserNavbar /> : <Navbar />}
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-field">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>
          <input type="email" placeholder="Email address" required />
          <input type="text" placeholder="Street" required />
          <div className="multi-field">
            <input type="text" placeholder="City" required />
          </div>
          <div className="multi-field">
            <input type="text" placeholder="Zip code" required />
          </div>
          <input type="text" placeholder="Phone" required />
        </div>
        <div className="place-order-right">
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
            <button
              type="submit" 
              onClick={handleProceedToPay} 
            >
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
