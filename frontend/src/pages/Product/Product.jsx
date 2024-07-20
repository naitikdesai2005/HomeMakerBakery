import React, { useContext } from "react";
import "./Product.css";
import { assets } from "../../../images/assets";
import { StoreContext } from "../context/StoreContext";

const Product = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const handleAddToCart = (id) => {
    console.log(`Adding product with ID: ${id}`);
    addToCart(id);
  };

  const handleRemoveFromCart = (id) => {
    console.log(`Removing product with ID: ${id}`);
    removeFromCart(id);
  };

  return (
    <div className="product-item" id="product">
      <div className="product-item-img-container">
        <img className="product-item-image" src={image} alt="" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => handleAddToCart(id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="product-item-counter">
            <img
              onClick={() => handleRemoveFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => handleAddToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
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
