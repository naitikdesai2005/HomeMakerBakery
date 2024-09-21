// // import React, { useContext, useEffect, useState } from "react";
// import "./Allproducts.css";
// import { useState, useContext, useEffect } from "react";
// import { assets } from "../../../images/assets";
// import { StoreContext } from "../context/StoreContext";
// import axios from "axios"; // Optional: Axios for API requests, or use fetch

// const AllProducts = ({ id, name, description, price, image }) => {
//   const [products, setProducts] = useState([]);
//   const { cartItems, addToCart } = useContext(StoreContext);

//   const url = "http://localhost:3000";

//   // Fetch products from the database
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${url}/api/user/getallitem`);
//         setProducts(response.data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="products-container">
//       {AllProducts.map((product) => (
//         <div className="product-item" key={product.id} id="product">
//           <div className="product-item-img-container">
//             <img
//               className="product-item-image"
//               src={url + "/uploads/" + product.image}
//               alt={product.name}
//             />
//             {!cartItems[product.id] ? (
//               <img
//                 className="add"
//                 onClick={() => addToCart(product.id)}
//                 src={assets.add_icon_white}
//                 alt="Add to cart"
//               />
//             ) : (
//               <div className="product-item-counter">
//                 <h3>✅</h3>
//               </div>
//             )}
//           </div>
//           <div className="product-item-info">
//             <div className="product-item-name-rating">
//               <p>{product.name}</p>
//             </div>
//             <p className="product-item-desc">{product.description}</p>
//             <p className="product-item-price">Rs.{product.price}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AllProducts;

import React from "react";

const Allproducts = () => {
  return (
    <div>
      <h1>all products</h1>
    </div>
  );
};

export default Allproducts;
