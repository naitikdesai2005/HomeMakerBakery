import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner"; // Import the loader

const ProductDisplay = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8); // Start with showing 8 products
  const [loading, setLoading] = useState(true); // Track loading state for the initial load
  const [loadingMore, setLoadingMore] = useState(false); // Track loading state for 'Load More' button
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
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchProducts();
  }, []);

  const loadMore = async () => {
    setLoadingMore(true); // Set loadingMore to true when fetching more products

    setTimeout(() => {
      // Simulating network delay
      setVisibleProducts((prevVisible) => prevVisible + 8); // Load 8 more products
      setLoadingMore(false); // Set loadingMore to false after fetching
    }, 1500); // Delay for demonstration (1.5 seconds)
  };

  return (
    <div className="mt-8 mb-5" id="product-display">
      {/* Display Loading Spinner for the initial products */}
      {loading ? (
        <div className="flex justify-center items-center mt-8">
          <RotatingLines
            strokeColor="#f79c3e"
            strokeWidth="5"
            animationDuration="0.75"
            width="60"
            visible={true}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-xl mx-auto mt-5">
          {products.slice(0, visibleProducts).map((item, index) => {
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
      )}

      {/* Load More Button */}
      {visibleProducts < products.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            className={`px-6 py-2 ${
              loadingMore ? "" : "bg-[#f79c3e]"
            } text-white font-semibold rounded-lg hover:bg-[#f79c3e] transition duration-300`}
            disabled={loadingMore} // Disable button when loading more products
          >
            {loadingMore ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
