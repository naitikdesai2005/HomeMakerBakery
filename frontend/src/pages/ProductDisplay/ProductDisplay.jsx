import React, { useContext } from "react";
import "./ProductDisplay.css";
import { StoreContext } from "../context/StoreContext";
import Product from "../Product/Product";

const ProductDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="product-display" id="product-display">
      <div className="product-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <Product
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ProductDisplay;
