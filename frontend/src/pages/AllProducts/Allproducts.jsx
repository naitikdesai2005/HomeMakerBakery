import React, { useEffect, useState } from "react";
import "./Allproducts.css";
import Product from "../Product/Product";
import axios from "axios";

const AllProducts = () => {
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
    <div className="all-products-container">
      <h1>All Products</h1>
      <div className="all-products-list">
        {products.map((item, index) => (
          <Product
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
