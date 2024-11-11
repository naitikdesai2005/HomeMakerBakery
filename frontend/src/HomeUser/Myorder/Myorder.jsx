import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../pages/context/StoreContext";
import UserNavbar from "../UserNavbar/UserNavbar";
import Footer from "../../pages/Footer/Footer";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token, currency } = useContext(StoreContext);
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [orderIdToCancel, setOrderIdToCancel] = useState(null);

  const fetchOrders = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/order/user-orders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  const accept = () => {
    handleCancelOrder();
    setVisible(false);
  };

  const reject = () => {
    toast.current.show({
      severity: "info",
      summary: "Action Cancelled",
      detail: "Order was not canceled",
    });
    setVisible(false);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <>
      <UserNavbar />
      <Toast ref={toast} />
      <ConfirmDialog
        group="declarative"
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to proceed?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
        reject={reject}
      />
      <div className="my-orders p-10 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-10">
          My Orders
        </h1>
        <div className="container mx-auto">
          {data.length === 0 ? (
            <h2 className="text-center text-2xl text-gray-600 mt-20">
              <span className="block text-5xl">😒</span>
              <span>Oops! You have no orders.</span>
            </h2>
          ) : (
            data.map((order, index) => (
              <div
                key={index}
                className="my-orders-order bg-white p-6 rounded-xl shadow-lg mb-8 transform transition duration-500 hover:scale-105"
              >
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xl font-semibold text-gray-800">
                    Order ID: {order._id}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-lg text-gray-600 mb-2">
                  <strong>Total Price:</strong> {currency} {order.totalPrice}
                </p>
                <div className="order-items grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {order.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="order-item flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-indigo-50"
                    >
                      {item.productId && item.productId.image ? (
                        <img
                          src={`http://localhost:3000/uploads/${item.productId.image}`}
                          alt={item.productId.name || "Product Image"}
                          className="w-20 h-20 object-cover rounded-lg mr-4"
                        />
                      ) : (
                        <p className="text-sm text-gray-400">
                          Image not available
                        </p>
                      )}
                      <div className="item-details text-gray-700 text-sm space-y-1">
                        <p className="font-semibold text-lg">
                          {item.productId?.name || "Product Name Not Available"}
                        </p>
                        <p>
                          Quantity:{" "}
                          <span className="font-medium">{item.quantity}</span>
                        </p>
                        <p>
                          Price per item:{" "}
                          <span className="font-medium">
                            {currency} {item.productId?.price || 0}
                          </span>
                        </p>
                        <p>
                          Total:{" "}
                          <span className="font-medium">
                            {currency}{" "}
                            {item.quantity * (item.productId?.price || 0)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setVisible(true)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
