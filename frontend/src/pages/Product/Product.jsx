import React, { useContext } from "react";
import "./Product.css";
import { assets } from "../../../images/assets";
import { StoreContext } from "../context/StoreContext";

const Product = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart } = useContext(StoreContext);
  const url = "http://localhost:3000";

  return (
    <div className="product-item" id="product">
      <div className="product-item-img-container">
        <img
          className="product-item-image"
          src={url + "/uploads/" + image}
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
        </div>
        <p className="product-item-desc">{description}</p>
        <p className="product-item-price">Rs.{price}</p>
      </div>
    </div>
  );
};

export default Product;
