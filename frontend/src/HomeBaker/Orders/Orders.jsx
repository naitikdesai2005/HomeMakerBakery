import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { RotatingLines } from "react-loader-spinner";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

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
      const response = await axios.get(
        "http://localhost:3000/api/order/baker-orders",
        { headers: { token } }
      );
      
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
    }
    setLoading(false);
  };

  const statusHandler = async (event, orderId) => {
    const status = event.target.value;
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/order/update-status",
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
    const filtered = orders.filter(
      (order) =>
        (order.user?.firstName || "").toLowerCase().includes(query) ||
        (order.user?.lastName || "").toLowerCase().includes(query)
    );
    setFilteredOrders(filtered);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Food Processing":
        return "bg-yellow-200 border-yellow-400";
      case "Out for delivery":
        return "bg-blue-200 border-blue-400";
      case "Delivered":
        return "bg-green-200 border-green-400";
      default:
        return "bg-gray-200 border-gray-400";
    }
  };

  const orderStatusTemplate = (rowData) => (
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
  );

  const productImageTemplate = (rowData) => (
    <div className="flex flex-wrap gap-2">
      {rowData.items.map((item, index) => (
        <div key={index} className="relative group">
          <img
            src={`${url}/uploads/${item.productId.image}`}
            alt="Product"
            className="w-16 h-16 object-cover rounded-lg shadow-sm 
              transition-transform duration-200 ease-in-out 
              group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 
            rounded-lg transition-opacity duration-200"></div>
        </div>
      ))}
    </div>
  );

  const productNameTemplate = (rowData) => (
    <div className="space-y-2">
      {rowData.items.map((item, index) => (
        <div key={index} className="text-sm font-medium text-gray-800 
          hover:text-gray-600 transition-colors duration-200">
          {item.productId.name || "No name"}
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
        {`${rowData.firstname || ""} ${rowData.user?.lastName || ""}`}
      </span>
    </div>
  );

  const addressTemplate = (rowData) => (
    <div className="max-w-xs">
      <p className="text-sm text-gray-700 line-clamp-2">
        {rowData.address || "No address"}
      </p>
    </div>
  );

  const phoneTemplate = (rowData) => (
    <div className="text-sm font-medium text-gray-700">
      {rowData.phone || "No phone"}
    </div>
  );

  const totalPriceTemplate = (rowData) => (
    <div className="text-sm font-bold text-gray-800">
      {`${currency}${rowData.totalPrice.toLocaleString()}`}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {loading ? (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
          <RotatingLines
            strokeColor="#f79c3e"
            strokeWidth="5"
            animationDuration="0.75"
            width="80"
            visible={true}
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
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
          
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <DataTable
              value={filteredOrders}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 15]}
              className="p-datatable-striped"
              emptyMessage={
                <div className="text-center py-8 text-gray-500">
                  No orders found
                </div>
              }
              rowHover
              responsiveLayout="scroll"
            >
              <Column
                header="Customer"
                body={customerNameTemplate}
                sortable
                className="p-4"
              />
              <Column
                header="Address"
                body={addressTemplate}
                className="p-4"
              />
              <Column
                header="Phone"
                body={phoneTemplate}
                className="p-4"
              />
              <Column
                header="Total Price"
                body={totalPriceTemplate}
                sortable
                className="p-4"
              />
              <Column
                header="Products"
                body={productImageTemplate}
                className="p-4"
              />
              <Column
                header="Product Details"
                body={productNameTemplate}
                className="p-4"
              />
              <Column
                header="Price"
                body={productPriceTemplate}
                className="p-4"
              />
              <Column
                header="Status"
                body={orderStatusTemplate}
                className="p-4"
              />
            </DataTable>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;