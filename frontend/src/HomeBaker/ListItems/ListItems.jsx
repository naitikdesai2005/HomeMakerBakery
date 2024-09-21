// import React, { useEffect, useState } from "react";
// import "./Listitems.css";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "../HomeBaker.css";

// const ListItems = () => {
//   const [list, setList] = useState([]);
//   const url = "http://localhost:3000";

//   const fetchList = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${url}/api/product/bakerProduct`, {
//         headers: {
//           token: token,
//         },
//       });
//       console.log(response.data);
//       if (response.data.success) {
//         setList(response.data.data);
//       } else {
//         toast.error(response.data.message || "Error fetching products");
//       }
//     } catch (error) {
//       console.error("Error fetching list:", error);
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   const removeFood = async (foodId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         `${url}/api/product/delete`,
//         { productId: foodId },
//         {
//           headers: {
//             token: token,
//           },
//         }
//       );
//       if (response.data.success) {
//         toast.success("Food item deleted successfully!");
//         await fetchList(); // Refresh the list to reflect changes
//       } else {
//         toast.error(response.data.message || "Failed to delete food item.");
//       }
//     } catch (error) {
//       toast.error("Something went wrong while deleting the item.");
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <div className="list add flex-col">
//       <h1>All Foods List</h1>
//       <div className="navbar-search">
//         <input type="text" placeholder="Search..." />
//       </div>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           {/* <b>Category</b> */}
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {list.map((item, index) => (
//           <div key={index} className="list-table-format">
//             <img src={`${url}/uploads/${item.image}`} alt={item.name} />
//             <p>{item.name}</p>
//             {/* <p>{item.category}</p> */}
//             <p>Rs.{item.price}</p>
//             <p onClick={() => removeFood(item._id)} className="cursor">
//               X
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ListItems;

import React, { useEffect, useState } from "react";
import "./Listitems.css";
import axios from "axios";
import { toast } from "react-toastify";
import "../HomeBaker.css";

const ListItems = () => {
  const [list, setList] = useState([]); // Full list of items
  const [filteredItems, setFilteredItems] = useState([]); // Filtered items for display
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const url = "http://localhost:3000";

  const fetchList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/api/product/bakerProduct`, {
        headers: {
          token: token,
        },
      });
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
        setFilteredItems(response.data.data); // Initialize with full list
      } else {
        toast.error(response.data.message || "Error fetching products");
      }
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase(); // Convert to lowercase for case-insensitive search
    setSearchQuery(query);

    // Filter the items based on the search query (e.g., by name or other attributes)
    const filtered = list.filter(
      (item) => item.name.toLowerCase().includes(query) // Adjust to include other fields if needed
    );
    setFilteredItems(filtered);
  };

  const removeFood = async (foodId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/api/product/delete`,
        { productId: foodId },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.success) {
        toast.success("Food item deleted successfully!");
        await fetchList(); // Refresh the list to reflect changes
      } else {
        toast.error(response.data.message || "Failed to delete food item.");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting the item.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <h1>All Foods List</h1>
      <div className="navbar-search-baker">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch} // Trigger search on input change
        />
      </div>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {filteredItems.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/uploads/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>Rs.{item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItems;
