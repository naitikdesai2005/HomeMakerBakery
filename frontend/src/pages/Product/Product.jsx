import React, { useContext, useState } from "react";
import "./Product.css";
import { assets } from "../../../images/assets";
import { StoreContext } from "../context/StoreContext";
import { Image } from "primereact/image";

const Product = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart } = useContext(StoreContext);
  const [showPreview, setShowPreview] = useState(false);
  const url = "http://localhost:3000";

  const togglePreview = () => {
    setShowPreview(!showPreview); 
  };

  return (
    <div className="product-item" id="product">
      <div className="product-item-img-container">
        <img
          className="product-item-image"
          src={url + "/uploads/" + image}
          alt={name}
          onClick={togglePreview} 
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

      {/* Image Preview Modal */}
      {showPreview && (
        <div className="image-preview-modal" onClick={togglePreview}>
          <Image
            src={url + "/uploads/" + image}
            alt={name}
            preview
            width="500" 
            className="product-image-preview"
          />
        </div>
      )}

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
