import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../pages/context/StoreContext";
import UserNavbar from "../UserNavbar/UserNavbar";
import Footer from "../../pages/Footer/Footer";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import "./Myorder.css";

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

  // const handleCancelOrder = async () => {
  //   try {
  //     await axios.post(
  //       "http://localhost:3000/api/order/cancel-order",
  //       { orderId: orderIdToCancel },
  //       { headers: { token } }
  //     );
  //     toast.current.show({ severity: "success", summary: "Order Canceled", detail: "The order has been canceled." });
  //     fetchOrders();
  //   } catch (error) {
  //     toast.current.show({ severity: "error", summary: "Error", detail: "Failed to cancel the order." });
  //   }
  // };

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

  // const confirmCancelOrder = (orderId) => {
  //   setOrderIdToCancel(orderId);
  //   setVisible(true);
  // };

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
      <div className="my-orders">
        <h1>My Orders</h1>
        <div className="container">
          {data.length === 0 ? (
            <h2>
              <center>Oops!😒</center>
              <br />
              <center>You have no orders.</center>
            </h2>
          ) : (
            data.map((order, index) => (
              <div key={index} className="my-orders-order">
                <p>Order ID: {order._id}</p>
                <p>
                  Order Status: <b>{order.status}</b>
                </p>
                <p>Total Price: Rs.{order.totalPrice}</p>
                <div className="order-items">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="order-item">
                      {item.productId && item.productId.image ? (
                        <img
                          src={`http://localhost:3000/uploads/${item.productId.image}`}
                          alt={item.productId.name || "Product Image"}
                        />
                      ) : (
                        <p>Image not available</p>
                      )}
                      <div className="item-details">
                        <p>
                          <strong>
                            {item.productId?.name ||
                              "Product Name Not Available"}
                          </strong>
                        </p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price per item: Rs.{item.productId?.price || 0}</p>
                        <p>
                          Total: Rs.
                          {item.quantity * (item.productId?.price || 0)}
                        </p>
                      </div>
                    </div>
                  ))}
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
