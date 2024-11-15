// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { RotatingLines } from "react-loader-spinner";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";
// import { FaCheckCircle } from "react-icons/fa"; 

// const Order = () => {
//   const [orders, setOrders] = useState([]);
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const currency = "Rs.";
//   const url = "http://localhost:3000";

//   const fetchAllOrders = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://localhost:3000/api/order/baker-orders",
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         const orderData = response.data.data.reverse();
//         setOrders(orderData);
//         setFilteredOrders(orderData);
//       } else {
//         toast.error("Failed to fetch orders.");
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       toast.error("An error occurred while fetching orders.");
//     }
//     setLoading(false);
//   };
  
//   useEffect(() => {
//     fetchAllOrders();
//   }, []);

//   const statusHandler = async (event, orderId) => {
//     const status = event.target.value;
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:3000/api/order/update-status",
//         { orderId, status },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success("Order status updated successfully.");
//         fetchAllOrders();
//       } else {
//         toast.error("Failed to update order status.");
//       }
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       toast.error("An error occurred while updating the status.");
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);
//     const filtered = orders.filter((order) =>
//       order.items.some((item) =>
//         (item.productId.name || "").toLowerCase().includes(query)
//       )
//     );
//     setFilteredOrders(filtered);
//   };

//   const orderStatusTemplate = (rowData) => {
//     return rowData.status === "Delivered" || rowData.status === "Cancelled" ? (
//       <div
//         className={`flex items-center ${
//           rowData.status === "Cancelled" ? "text-red-600" : "text-green-600"
//         } font-semibold`}
//       >
//         {rowData.status === "Delivered" ? <FaCheckCircle className="mr-2" /> : null}
//         {rowData.status}
//       </div>
//     ) : (
//       <select
//         onChange={(e) => statusHandler(e, rowData._id)}
//         value={rowData.status}
//         className={`order-status-select w-full md:w-auto p-2 border-2 rounded-lg 
//           transition-all duration-200 ease-in-out cursor-pointer 
//           hover:opacity-80 font-medium ${getStatusClass(rowData.status)}`}
//       >
//         <option value="Food Processing">Food Processing</option>
//         <option value="Out for delivery">Out for delivery</option>
//         <option value="Delivered">Delivered</option>
//       </select>
//     );
//   };
  
//   const getStatusClass = (status) => {
//     switch (status) {
//       case "Food Processing":
//         return "bg-yellow-200 border-yellow-400 text-yellow-800";
//       case "Out for delivery":
//         return "bg-blue-200 border-blue-400 text-blue-800";
//       case "Delivered":
//         return "bg-green-200 border-green-900 text-black-800";
//       case "Cancelled":
//         return "bg-red-200 border-red-400 text-red-800"; // Add this case
//       default:
//         return "bg-gray-200 border-gray-400 text-gray-800";
//     }
//   };
  

//   const productImageTemplate = (rowData) => (
//     <div className="flex flex-wrap gap-2">
//       {rowData.items.map((item, index) => (
//         <div key={index} className="relative group">
//           <img
//             src={`${url}/uploads/${item.productId.image}`}
//             alt="Product"
//             className="w-16 h-16 object-cover rounded-lg shadow-sm 
//             transition-transform duration-200 ease-in-out 
//             group-hover:scale-105"
//           />
//           <div
//             className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 
//           rounded-lg transition-opacity duration-200"
//           ></div>
//         </div>
//       ))}
//     </div>
//   );

//   const productNameTemplate = (rowData) => (
//     <div className="space-y-2">
//       {rowData.items.map((item, index) => (
//         <div
//           key={index}
//           className="text-sm font-medium text-gray-800 
//                hover:text-gray-600 transition-colors duration-200"
//         >
//           {item.productId.name || "No name"}
//         </div>
//       ))}
//     </div>
//   );

//   const productPriceTemplate = (rowData) => (
//     <div className="space-y-2">
//       {rowData.items.map((item, index) => (
//         <div key={index} className="text-sm font-medium text-gray-700">
//           {`${currency}${item.price.toLocaleString()}`}
//         </div>
//       ))}
//     </div>
//   );

//   const customerNameTemplate = (rowData) => (
//     <div className="flex flex-col">
//       <span className="text-sm font-medium text-gray-800">
//         {`${rowData.firstname || ""} ${rowData.user?.lastName || ""}`}
//       </span>
//     </div>
//   );

//   const addressTemplate = (rowData) => (
//     <div className="max-w-xs">
//       <p className="text-sm text-gray-700 line-clamp-2">
//         {rowData.address || "No address"}
//       </p>
//     </div>
//   );

//   const phoneTemplate = (rowData) => (
//     <div className="text-sm font-medium text-gray-700">
//       {rowData.phone || "No phone"}
//     </div>
//   );

//   const totalPriceTemplate = (rowData) => (
//     <span className="text-sm font-bold text-gray-800">
//       {`${currency}${rowData.totalPrice.toLocaleString()}`}
//     </span>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       {/* Sidebar and header remain visible while orders load */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
//         <input
//           type="text"
//           className="w-full md:w-64 p-2 border border-gray-300 rounded-lg 
//             focus:ring-2 focus:ring-orange-500 focus:border-orange-500
//             transition-all duration-200 ease-in-out"
//           placeholder="Search by customer name"
//           value={searchQuery}
//           onChange={handleSearch}
//         />
//       </div>

//       {/* Loading Spinner for Order content only */}
//       {loading && (
//         <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
//           <RotatingLines
//             strokeColor="#f79c3e"
//             strokeWidth="5"
//             animationDuration="0.75"
//             width="80"
//             visible={true}
//           />
//         </div>
//       )}

//       {/* Order Table */}
//       <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-4 w-full">
//         <DataTable
//           value={filteredOrders}
//           paginator
//           rows={3}
//           rowsPerPageOptions={[5, 10, 15]}
//           className="p-datatable-striped w-full"
//           emptyMessage={
//             <div className="text-center py-8 text-gray-500">
//               No orders found
//             </div>
//           }
//           rowHover
//           responsiveLayout="scroll"
//         >
//           <Column
//             header="Customer"
//             body={customerNameTemplate}
//             className="p-4"
//           />
//           <Column header="Address" body={addressTemplate} className="p-4" />
//           <Column header="Phone" body={phoneTemplate} className="p-4" />
//           <Column
//             header="Total Price"
//             body={totalPriceTemplate}
//             className="p-4"
//           />
//           <Column
//             header="Products"
//             body={productImageTemplate}
//             className="p-4"
//           />
//           <Column
//             header="Product Details"
//             body={productNameTemplate}
//             className="p-4"
//           />
//           <Column header="Price" body={productPriceTemplate} className="p-4" />
//           <Column header="Status" body={orderStatusTemplate} className="p-4" />
//         </DataTable>
//       </div>
//     </div>
//   );
// };

// export default Order;
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { RotatingLines } from "react-loader-spinner";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { FaCheckCircle } from "react-icons/fa";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const currency = "Rs.";
  const url = "http://localhost:3000";

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
      const response = await axios.get(`${url}/api/order/baker-orders`, {
        headers: { token },
        params: { userId }, // Passing userId as query parameter
      });

      if (response.data.success) {
        const orderData = response.data.data.reverse();
        setOrders(orderData);
        setFilteredOrders(orderData);
      } else {
        toast.error("Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async (event, orderId) => {
    const status = event.target.value;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/api/order/update-status`,
        { orderId, status },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Order status updated successfully.");
        fetchAllOrders();
      } else {
        toast.error("Failed to update order status.");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("An error occurred while updating the status.");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = orders.filter((order) =>
      order.items.some((item) =>
        (item.name || "").toLowerCase().includes(query)
      )
    );
    setFilteredOrders(filtered);
  };

  const orderStatusTemplate = (rowData) => (
    rowData.status === "Delivered" || rowData.status === "Cancelled" ? (
      <div
        className={`flex items-center ${
          rowData.status === "Cancelled" ? "text-red-600" : "text-green-600"
        } font-semibold`}
      >
        {rowData.status === "Delivered" && <FaCheckCircle className="mr-2" />}
        {rowData.status}
      </div>
    ) : (
      <select
        onChange={(e) => statusHandler(e, rowData._id)}
        value={rowData.status}
        className={`order-status-select w-full md:w-auto p-2 border-2 rounded-lg 
          transition-all duration-200 ease-in-out cursor-pointer 
          hover:opacity-80 font-medium ${getStatusClass(rowData.status)}`}
      >
        <option value="Food Processing">Food Processing</option>
        <option value="Out for delivery">Out for delivery</option>
        <option value="Delivered">Delivered</option>
      </select>
    )
  );

  const getStatusClass = (status) => {
    switch (status) {
      case "Food Processing":
        return "bg-yellow-200 border-yellow-400 text-yellow-800";
      case "Out for delivery":
        return "bg-blue-200 border-blue-400 text-blue-800";
      case "Delivered":
        return "bg-green-200 border-green-900 text-black-800";
      case "Cancelled":
        return "bg-red-200 border-red-400 text-red-800";
      default:
        return "bg-gray-200 border-gray-400 text-gray-800";
    }
  };

  const productImageTemplate = (rowData) => (
    <div className="flex flex-wrap gap-2">
      {rowData.items.map((item, index) => (
        <div key={index} className="relative group">
          <img
            src={`${url}/uploads/${item.image}`}
            alt="Product"
            className="w-16 h-16 object-cover rounded-lg shadow-sm 
            transition-transform duration-200 ease-in-out 
            group-hover:scale-105"
          />
          <div
            className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 
            rounded-lg transition-opacity duration-200"
          ></div>
        </div>
      ))}
    </div>
  );

  const productNameTemplate = (rowData) => (
    <div className="space-y-2">
      {rowData.items.map((item, index) => (
        <div
          key={index}
          className="text-sm font-medium text-gray-800 
               hover:text-gray-600 transition-colors duration-200"
        >
          {item.name || "No name"}
        </div>
      ))}
    </div>
  );

  const productPriceTemplate = (rowData) => (
    <div className="space-y-2">
      {rowData.items.map((item, index) => (
        <div key={index} className="text-sm font-medium text-gray-700">
          {`${currency}${item.price.toLocaleString()}`}
        </div>
      ))}
    </div>
  );

  const customerNameTemplate = (rowData) => (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-800">
        {`${rowData.user?.name || ""}`}
      </span>
    </div>
  );

  const addressTemplate = (rowData) => (
    <div className="max-w-xs">
      <p className="text-sm text-gray-700 line-clamp-2">
        {rowData.user?.address || "No address"}
      </p>
    </div>
  );

  const phoneTemplate = (rowData) => (
    <div className="text-sm font-medium text-gray-700">
      {rowData.user?.phone || "No phone"}
    </div>
  );

  const totalPriceTemplate = (rowData) => (
    <span className="text-sm font-bold text-gray-800">
      {`${currency}${rowData.totalPrice.toLocaleString()}`}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <input
          type="text"
          className="w-full md:w-64 p-2 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-orange-500 focus:border-orange-500
            transition-all duration-200 ease-in-out"
          placeholder="Search by customer name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {loading && (
        <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
          <RotatingLines
            strokeColor="#f79c3e"
            strokeWidth="5"
            animationDuration="0.75"
            width="80"
            visible={true}
          />
        </div>
      )}

      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm p-4 w-full">
        <DataTable
          value={filteredOrders}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 15]}
          className="p-datatable-striped w-full"
          emptyMessage={
            <div className="text-center py-8 text-gray-500">
              No orders found
            </div>
          }
          rowHover
          responsiveLayout="scroll"
        >
          <Column header="Customer" body={customerNameTemplate} className="p-4" />
          <Column header="Address" body={addressTemplate} className="p-4" />
          <Column header="Phone" body={phoneTemplate} className="p-4" />
          <Column header="Total Price" body={totalPriceTemplate} className="p-4" />
          <Column header="Products" body={productImageTemplate} className="p-4" />
          <Column header="Product Details" body={productNameTemplate} className="p-4" />
          <Column header="Price" body={productPriceTemplate} className="p-4" />
          <Column header="Status" body={orderStatusTemplate} className="p-4" />
        </DataTable>
      </div>
    </div>
  );
};

export default Order;
