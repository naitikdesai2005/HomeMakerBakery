// import React, { useContext } from "react";
// import "./ProductDisplay.css";
// import { StoreContext } from "../context/StoreContext";
// import Product from "../Product/Product";

// const ProductDisplay = ({ category }) => {
//   const { food_list } = useContext(StoreContext);

//   if (!food_list || food_list.length === 0) {
//     return <div>No products available.</div>;
//   }

//   return (
//     <div className="product-display" id="product-display">
//       <div className="product-display-list">
//         {food_list.map((item, index) => {
//           if (category === "All" || category === item.category) {
//             return (
//               <Product
//                 key={index}
//                 id={item._id}
//                 name={item.name}
//                 description={item.description}
//                 price={item.price}
//                 image={item.image}
//               />
//             );
//           }
//           return null;
//         })}
//       </div>
//     </div>
//   );
// };

// export default ProductDisplay;

import React, { useContext, useEffect, useState } from "react";
import "./ProductDisplay.css";
import { StoreContext } from "../context/StoreContext";
import Product from "../Product/Product";

const ProductDisplay = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://localhost:3000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${url}/api/product/bakerProduct`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products data:", error);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }

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
