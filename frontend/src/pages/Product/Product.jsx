import React from "react";
import "./Product.css";
import { assets } from "../../../images/assets";

const Product = ({ id, name, price, description, image }) => {
  return (
    <div className="product-item" id="product">
      <div className="food-item-img-container">
        <img className="product-item-image" src={image} alt="" />
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
