// import React, { useState } from "react";
// import { Search } from "react-feather";
// import Sidebar from "../Sidebar/Sidebar.jsx";

// const Users = () => {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);

//   const orders = [
//     {
//       id: "#1001",
//       name: "Camera Lens",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1002",
//       name: "Black Sleep Dress",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1003",
//       name: "Argan Oil",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1004",
//       name: "EAU DE Parfum",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1005",
//       name: "Perfume",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1006",
//       name: "Lipstick",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1007",
//       name: "Sunglasses",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1008",
//       name: "Watch",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1001",
//       name: "Camera Lens",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1002",
//       name: "Black Sleep Dress",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1003",
//       name: "Argan Oil",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1004",
//       name: "EAU DE Parfum",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1005",
//       name: "Perfume",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1006",
//       name: "Lipstick",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1007",
//       name: "Sunglasses",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//     {
//       id: "#1008",
//       name: "Watch",
//       email: "abc@gmail.com",
//       Total_Order: "1236",
//     },
//   ];

//   const [searchQuery, setSearchQuery] = useState(""); // Add state for search input
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 9;

//   // Filter orders based on search query
//   const filteredOrders = orders.filter(
//     (order) =>
//       order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order.id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

//   // Get the current page's items
//   const currentItems = filteredOrders.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   // Handle page navigation
//   const goToNextPage = () =>
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const goToPreviousPage = () =>
//     setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const goToPage = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar visible={isSidebarVisible} />

//       <div className="bg-white p-6 rounded-xl shadow-md ml-64">
//         {" "}
//         {/* Added ml-64 for left margin */}
//         <div className="flex justify-between items-center mb-4 m-10">
//           <h2 className="text-xl font-semibold text-gray-800">Users List</h2>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search here"
//               className="w-full lg:w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
//             />
//             <Search className="absolute right-3 top-2 text-gray-500 w-5 h-5" />
//           </div>
//         </div>
//         {/* Orders Table */}
//         <table className="w-full text-left">
//           <thead>
//             <tr className="text-gray-500 text-sm">
//               <th className="py-2 px-3">
//                 <input type="checkbox" className="rounded border-gray-300" />
//               </th>
//               <th className="py-2 px-3">User Id</th>
//               <th className="py-2 px-3">User Name</th>
//               <th className="py-2 px-3">Email</th>
//               <th className="py-2 px-3">Total order</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((order, index) => (
//               <tr
//                 key={order.id}
//                 className={`text-gray-700 ${
//                   index % 2 !== 0 ? "bg-gray-50" : ""
//                 }`}
//               >
//                 <td className="py-3 px-3">
//                   <input type="checkbox" className="rounded border-gray-300" />
//                 </td>
//                 <td className="py-3 px-3">{order.id}</td>
//                 <td className="py-3 px-3 flex items-center">
//                   <img
//                     src={order.image}
//                     alt={order.name}
//                     className="w-8 h-8 rounded-full mr-2"
//                   />
//                   {order.name}
//                 </td>
//                 <td className="py-3 px-3">{order.email}</td>
//                 <td className="py-3 px-3">{order.Total_Order}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-4 text-gray-600">
//           <span>
//             {(currentPage - 1) * itemsPerPage + 1}-{" "}
//             {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
//             {filteredOrders.length}
//           </span>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={goToPreviousPage}
//               className="p-2 hover:bg-gray-100 rounded-full"
//               disabled={currentPage === 1}
//             >
//               &lt;
//             </button>
//             {[...Array(totalPages)].map((_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => goToPage(index + 1)}
//                 className={`w-8 h-8 flex items-center justify-center rounded-full ${
//                   currentPage === index + 1
//                     ? "bg-blue-500 text-white"
//                     : "hover:bg-gray-200"
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}
//             <button
//               onClick={goToNextPage}
//               className="p-2 hover:bg-gray-100 rounded-full"
//               disabled={currentPage === totalPages}
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Users;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Search } from "react-feather";
import Sidebar from "../Sidebar/Sidebar.jsx";

const Users = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [users, setUsers] = useState([]); // State for user data
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch users data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/usersData"); // Update with the correct backend API endpoint
        if (response.data.status) {
          setUsers(response.data.data);
        } else {
          console.log("Users data not found");
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter orders based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Get the current page's items
  const currentItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page navigation
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar visible={isSidebarVisible} />

      <div className="bg-white p-6 rounded-xl shadow-md ml-64">
        {/* Main content */}
        <div className="flex justify-between items-center mb-4 m-10">
          <h2 className="text-xl font-semibold text-gray-800">Users List</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search here"
              className="w-full lg:w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            />
            <Search className="absolute right-3 top-2 text-gray-500 w-5 h-5" />
          </div>
        </div>
        {/* Users Table */}
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="py-2 px-3">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="py-2 px-3">User Id</th>
              <th className="py-2 px-3">User Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Total order</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user, index) => (
              <tr
                key={user._id} // Assuming _id as MongoDB ID
                className={`text-gray-700 ${
                  index % 2 !== 0 ? "bg-gray-50" : ""
                }`}
              >
                <td className="py-3 px-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="py-3 px-3">{user.id}</td>
                <td className="py-3 px-3 flex items-center">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {user.name}
                </td>
                <td className="py-3 px-3">{user.email}</td>
                <td className="py-3 px-3">{user.totalOrder}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-gray-600">
          <span>
            {(currentPage - 1) * itemsPerPage + 1}-{" "}
            {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPreviousPage}
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => goToPage(index + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={goToNextPage}
              className="p-2 hover:bg-gray-100 rounded-full"
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
