// import React, { useContext, useState } from "react";
// import "./Cart.css";
// import { StoreContext } from "../context/StoreContext";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import { assets } from "../../../images/assets";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const { cartItems, food_list, removeFromCart, getTotalCartAmount } =
//     useContext(StoreContext);

//   const navigate = useNavigate();
//   const [emptyCartMessage, setEmptyCartMessage] = useState(false);

//   const handleCheckout = () => {
//     if (getTotalCartAmount() === 0) {
//       setEmptyCartMessage(true);
//     } else {
//       setEmptyCartMessage(false);
//       navigate("/order");
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="cart">
//         <div className="cart-items">
//           <div className="cart-items-title">
//             <p>Items</p>
//             <p>Title</p>
//             <p>Price</p>
//             <p>Quantity</p>
//             <p>Total</p>
//             <p>Remove</p>
//           </div>
//           <hr />
//           <br />
//           {food_list.map((item, index) => {
//             if (cartItems[item._id] > 0) {
//               return (
//                 <div key={index}>
//                   <div className="cart-items-title cart-items-item">
//                     <img src={item.image} alt="" />
//                     <p>{item.name}</p>
//                     <p>Rs. {item.price}</p>
//                     <p>{cartItems[item._id]}</p>
//                     <p>Rs. {item.price * cartItems[item._id]}</p>
//                     <p
//                       onClick={() => removeFromCart(item._id)}
//                       className="cross"
//                     >
//                       <img src={assets.cross_icon} alt="" />
//                     </p>
//                   </div>
//                   <hr />
//                 </div>
//               );
//             }
//           })}
//         </div>
//         <div className="cat-bottom">
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
//             {emptyCartMessage && (
//               <h2 className="empty-cart-message">Your cart is empty😒</h2>
//             )}
//             <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>
//       </div>
//       <br />
//       <br />
//       <br />
//       <br />
//       <Footer />
//     </>
//   );
// };

// export default Cart;

import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../context/StoreContext";
import UserNavbar from "../../HomeUser/UserNavbar/UserNavbar.jsx"; // Assuming you have a UserNavbar component
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { assets } from "../../../images/assets";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, isAuthenticated } =
    useContext(StoreContext);

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
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="cart-items-title cart-items-item">
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>Rs. {item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>Rs. {item.price * cartItems[item._id]}</p>
                    <p
                      onClick={() => removeFromCart(item._id)}
                      className="cross"
                    >
                      <img src={assets.cross_icon} alt="" />
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
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

