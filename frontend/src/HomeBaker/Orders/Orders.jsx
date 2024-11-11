import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { RotatingLines } from "react-loader-spinner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
        return "bg-yellow-200"; // Yellow for Food Processing
      case "Out for delivery":
        return "bg-blue-200"; // Blue for Out for delivery
      case "Delivered":
        return "bg-green-400"; // Green for Delivered
      default:
        return "bg-gray-200"; // Default gray
    }
  };

  const orderStatusTemplate = (rowData) => (
    <select
      onChange={(e) => statusHandler(e, rowData._id)}
      value={rowData.status}
      className={`order-status-select w-full md:w-auto p-2 border border-gray-300 rounded-lg hover:bg-gray-200 text-gray-700 ${getStatusClass(
        rowData.status
      )}`}
    >
      <option value="Food Processing">Food Processing</option>
      <option value="Out for delivery">Out for delivery</option>
      <option value="Delivered">Delivered</option>
    </select>
  );

  const productImageTemplate = (rowData) => (
    <img
      src={`${url}/uploads/${rowData.image}`}
      alt="Product"
      className="w-16 h-16 object-cover rounded"
    />
  );

  return (
    <div className="bg-gray-100">
      {loading ? (
        <div className="flex justify-center items-center h-screen  absolute top-0 left-0 right-0 bottom-0 bg-opacity-50">
          <RotatingLines
            strokeColor="#f79c3e"
            strokeWidth="5"
            animationDuration="0.75"
            width="80"
            visible={true}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Search by customer name"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div id="orderTable">
            <DataTable
              value={filteredOrders}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 15]}
              className="p-datatable-striped"
              emptyMessage="No orders found."
            >
              <Column
                field="user.firstName"
                header="Customer Name"
                body={(rowData) =>
                  `${rowData.user?.firstName || ""} ${
                    rowData.user?.lastName || ""
                  }`
                }
                sortable
              />
              <Column
                field="user.address"
                header="Address"
                body={(rowData) => rowData.user?.address || "No address"}
              />
              <Column
                field="user.phone"
                header="Phone"
                body={(rowData) => rowData.user?.phone || "No phone"}
              />
              <Column
                field="totalPrice"
                header="Total Price"
                body={(rowData) => `${currency}${rowData.totalPrice}`}
              />
              <Column header="Product Image" body={productImageTemplate} />
              <Column
                field="product.name"
                header="Product Name"
                body={(rowData) => rowData.name || "No name"}
              />
              <Column
                field="product.price"
                header="Price"
                body={(rowData) => `Rs. ${rowData.price}`}
              />
              <Column header="Status" body={orderStatusTemplate} />
            </DataTable>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
