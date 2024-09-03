import React, { useContext } from "react";
import "./Product.css";
import { assets } from "../../../images/assets";
import { StoreContext } from "../context/StoreContext";

const Product = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="product-item" id="product">
      <div className="product-item-img-container">
        <img className="product-item-image" src={image} alt="" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="product-item-counter">
            {/* <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            /> */}
            <h3>✅</h3>
          </div>
        )}
      </div>
      <div className="product-item-info">
        <div className="product-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="product-item-desc">{description}</p>
        <p className="product-item-price">${price}</p>
      </div>
    </div>
  );
};

export default Product;
