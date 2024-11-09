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

// import React, { useEffect, useState } from "react";
// import "./ProductDisplay.css";
// import Product from "../Product/Product";
// import axios from "axios";
// import { Paginator } from 'primereact/paginator';

// const ProductDisplay = ({ category }) => {
//   const [products, setProducts] = useState([]);
//   const [first, setFirst] = useState(0); // Track starting index of products
//   const [rows, setRows] = useState(8); // Number of products per page
//   const url = "http://localhost:3000";

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${url}/api/user/getallitem`);
        
//         if (response.data.success && Array.isArray(response.data.data)) {
//           setProducts(response.data.data);
//         } else {
//           setProducts([]);
//         }
//       } catch (error) {
//         console.error("Error fetching products data:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const onPageChange = (event) => {
//     setFirst(event.first);
//     setRows(event.rows);
//   };

//   const filteredProducts = products.filter(item => category === "All" || category === item.category);

//   return (
//     <div className="product-display" id="product-display">
//       <div className="product-display-list">
//         {filteredProducts.slice(first, first + rows).map((item, index) => (
//           <Product
//             key={index}
//             id={item._id}
//             name={item.name}
//             description={item.description}
//             price={item.price}
//             image={item.image}
//           />
//         ))}
//       </div>
//       <Paginator
//         first={first}
//         rows={rows}
//         totalRecords={filteredProducts.length}
//         rowsPerPageOptions={[12, 15, 18]}
//         onPageChange={onPageChange}
//       />
//     </div>
//   );
// };

// export default ProductDisplay;

