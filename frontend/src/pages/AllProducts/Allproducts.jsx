import React, { useContext, useEffect, useState } from "react";
import "./Allproducts.css";
import Product from "../Product/Product";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import UserNavbar from "../../HomeUser/UserNavbar/UserNavbar";
import { StoreContext } from "../context/StoreContext";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const url = "http://localhost:3000";
  const { isAuthenticated } = useContext(StoreContext);

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
    <>
      {isAuthenticated ? <UserNavbar /> : <Navbar />}
      <div className="all-products-container">
        <br />
        <br />
        <br />
        <br />
        <br />
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
    </>
  );
};

export default AllProducts;
