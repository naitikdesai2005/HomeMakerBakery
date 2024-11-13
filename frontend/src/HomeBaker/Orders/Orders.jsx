import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
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
      const response = await axios.get(`${url}/api/order/baker-orders`, {
        headers: { token },
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
    }
    setLoading(false);
  };

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
    const filtered = orders.filter((order) => {
      const fullName = `${order.user?.firstname || ""} ${
        order.user?.lastName || ""
      }`.toLowerCase();
      return fullName.includes(query);
    });
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
      className={`order-status-select w-full p-2 border-2 rounded-lg ${getStatusClass(
        rowData.status
      )}`}
    >
      <option value="Food Processing">Food Processing</option>
      <option value="Out for delivery">Out for delivery</option>
      <option value="Delivered">Delivered</option>
    </select>
  );

  const productImageTemplate = (rowData) => (
    <div className="flex gap-2">
      {rowData.items.map((item, index) => (
        <img
          key={index}
          src={`${url}/uploads/${item.productId.image}`}
          alt="Product"
          className="w-16 h-16 object-cover rounded-lg"
        />
      ))}
    </div>
  );

  const productNameTemplate = (rowData) => (
    <div>
      {rowData.items.map((item, index) => (
        <div key={index} className="text-sm font-medium text-gray-800">
          {item.productId.name || "No name"}
        </div>
      ))}
    </div>
  );

  const productPriceTemplate = (rowData) => (
    <div>
      {rowData.items.map((item, index) => (
        <div key={index} className="text-sm font-medium text-gray-700">
          {`${currency}${item.price.toLocaleString()}`}
        </div>
      ))}
    </div>
  );

  const customerNameTemplate = (rowData) => (
    <span className="text-sm font-medium text-gray-800">
      {`${rowData.user?.firstname || ""} ${rowData.user?.lastName || ""}`}
    </span>
  );

  const addressTemplate = (rowData) => (
    <p className="text-sm text-gray-700">{rowData.address || "No address"}</p>
  );

  const phoneTemplate = (rowData) => (
    <span className="text-sm font-medium text-gray-700">
      {rowData.phone || "No phone"}
    </span>
  );

  const totalPriceTemplate = (rowData) => (
    <span className="text-sm font-bold text-gray-800">
      {`${currency}${rowData.totalPrice.toLocaleString()}`}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75">
          <RotatingLines strokeColor="#f79c3e" strokeWidth="5" width="80" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Order Management
            </h1>
            <input
              type="text"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="Search by customer name"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <DataTable
            value={filteredOrders}
            paginator
            rows={5}
            className="p-datatable-striped"
          >
            <Column
              header="Customer"
              body={customerNameTemplate}
              style={{ width: "150px" }}
            />
            <Column
              header="Address"
              body={addressTemplate}
              style={{ width: "200px" }}
            />
            <Column
              header="Phone"
              body={phoneTemplate}
              style={{ width: "150px" }}
            />
            <Column
              header="Products"
              body={productImageTemplate}
              style={{ width: "150px" }}
            />
            <Column
              header="Product Details"
              body={productNameTemplate}
              style={{ width: "150px" }}
            />
            <Column
              header="Product Price"
              body={productPriceTemplate}
              style={{ width: "120px" }}
            />
            <Column
              header="Total Price"
              body={totalPriceTemplate}
              style={{ width: "120px" }}
            />
            <Column
              header="Status"
              body={orderStatusTemplate}
              style={{ width: "150px" }}
            />
          </DataTable>
        </div>
      )}
    </div>
  );
};

export default Order;
