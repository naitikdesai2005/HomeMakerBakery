import React, { useContext } from "react";
import "./Order.css";
import { StoreContext } from "../context/StoreContext";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <>
      {isAuthenticated ? <UserNavbar /> : <Navbar />}
      <Navbar />
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-field">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <input type="email" placeholder="Email address" />
          <input type="text" placeholder="Street" />
          <div className="multi-field">
            <input type="text" placeholder="City" />
          </div>
          <div className="multi-field">
            <input type="text" placeholder="Zip code" />
          </div>
          <input type="text" placeholder="Phone" />
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
            <button>PROCEED TO PAY</button>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default PlaceOrder;

// import React, { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Order.css";
// import { StoreContext } from "../context/StoreContext";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// const PlaceOrder = () => {
//   const { getTotalCartAmount, isAuthenticated } = useContext(StoreContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <>
//       <Navbar />
//       <form className="place-order">
//         <div className="place-order-left">
//           <p className="title">Delivery Information</p>
//           <div className="multi-field">
//             <input type="text" placeholder="First Name" />
//             <input type="text" placeholder="Last Name" />
//           </div>
//           <input type="email" placeholder="Email address" />
//           <input type="text" placeholder="Street" />
//           <div className="multi-field">
//             <input type="text" placeholder="City" />
//           </div>
//           <div className="multi-field">
//             <input type="text" placeholder="Zip code" />
//           </div>
//           <input type="text" placeholder="Phone" />
//         </div>
//         <div className="place-order-right">
//           <div className="cart-total">
//             <h2>Cart Totals</h2>
//             <div>
//               <div className="cart-total-details">
//                 <p>Subtotal</p>
//                 <p>Rs. {getTotalCartAmount()}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <p>Delivery Fee</p>
//                 <p>Rs. {getTotalCartAmount() === 0 ? 0 : 2}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <b>Total</b>
//                 <b>
//                   Rs.{" "}
//                   {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
//                 </b>
//               </div>
//             </div>
//             <button>PROCEED TO PAY</button>
//           </div>
//         </div>
//       </form>
//       <Footer />
//     </>
//   );
// };

// export default PlaceOrder;
