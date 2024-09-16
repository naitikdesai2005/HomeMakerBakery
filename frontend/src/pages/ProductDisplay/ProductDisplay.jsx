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
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-display" id="product-display">
      <div className="product-display-list">
        {products.map((item, index) => {
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
