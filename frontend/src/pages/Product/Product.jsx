import React, { useContext } from "react";
import "./Product.css";
import { assets } from "../../../images/assets";
import { StoreContext } from "../context/StoreContext";

const Product = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart } = useContext(StoreContext);

  return (
    <div className="product-item" id="product">
      <div className="product-item-img-container">
        <img
          className="product-item-image"
          src={`http://localhost:3000/uploads/${image}`}
          alt={name}
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="product-item-counter">
            <h3>✅</h3>
          </div>
        )}
      </div>
      <div className="product-item-info">
        <div className="product-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="product-item-desc">{description}</p>
        <p className="product-item-price">${price}</p>
      </div>
    </div>
  );
};

export default Product;
