import React, { useEffect, useState } from "react";
import "./ProductDisplay.css";
import Product from "../Product/Product";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation

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
        {products.slice(0, 6).map((item, index) => { // Display only first 6 products
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
      {/* View More button */}
      <div className="view-more-container">
        <Link className="view-more-btn" to="/allproduct">
          <button>View More</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDisplay;
