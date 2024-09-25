import React, { useEffect, useState } from "react";
import "./ProductDisplay.css";
import Product from "../Product/Product";
import axios from "axios";

const ProductDisplay = ({ category }) => {
  const [products, setProducts] = useState([]);
  const url = "http://localhost:3000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url}/api/user/getallitem`);

        if (response.data.success && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products data:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-display" id="product-display">
      <div className="product-display-list">
        {products.slice(0, 8).map((item, index) => {
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
      <a className="viewmore" href="/allproduct">
        view more »»
      </a>
    </div>
  );
};

export default ProductDisplay;
