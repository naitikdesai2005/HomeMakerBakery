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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products data:", error);
        setError("Failed to load products.");
        setLoading(false);
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
