// import React, { useContext, useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { StoreContext } from "../../pages/context/StoreContext";
// import UserNavbar from "../UserNavbar/UserNavbar";
// import Footer from "../../pages/Footer/Footer";
// import { Toast } from "primereact/toast";
// import { ConfirmDialog } from "primereact/confirmdialog";
// import { Button } from "primereact/button";

// const MyOrders = () => {
//   const [data, setData] = useState([]);
//   const { token, currency } = useContext(StoreContext);
//   const toast = useRef(null);
//   const [visible, setVisible] = useState(false);
//   const [orderIdToCancel, setOrderIdToCancel] = useState(null);
//   const [orderToUpdate, setOrderToUpdate] = useState(null);
//   const [updatedItems, setUpdatedItems] = useState([]);

//   const fetchOrders = async () => {
//     const response = await axios.post(
//       "http://localhost:3000/api/order/user-orders",
//       {},
//       { headers: { token } }
//     );
//     setData(response.data.data);
//   };

//   const handleCancelOrder = async (orderId) => {
//     const response = await axios.post(
//       "http://localhost:3000/api/order/update",
//       { orderId, cancel: true },
//       { headers: { token } }
//     );
//     if (response.data.success) {
//       fetchOrders();
//       toast.current.show({
//         severity: "success",
//         summary: "Order Cancelled",
//         detail: "Your order has been successfully cancelled",
//       });
//     } else {
//       toast.current.show({
//         severity: "error",
//         summary: "Error",
//         detail: response.data.message,
//       });
//     }
//   };

//   const handleUpdateOrder = async () => {
//     const response = await axios.post(
//       "http://localhost:3000/api/order/update",
//       { orderId: orderToUpdate._id, items: updatedItems, cancel: false },
//       { headers: { token } }
//     );
//     if (response.data.success) {
//       fetchOrders();
//       toast.current.show({
//         severity: "success",
//         summary: "Order Updated",
//         detail: "Your order has been successfully updated",
//       });
//     } else {
//       toast.current.show({
//         severity: "error",
//         summary: "Error",
//         detail: response.data.message,
//       });
//     }
//     setOrderToUpdate(null);
//   };

//   const handleChangeQuantity = (orderId, productId, quantity) => {
//     setUpdatedItems((prevItems) => {
//       const existingItem = prevItems.find(
//         (item) => item.productId === productId
//       );
//       if (existingItem) {
//         existingItem.quantity = quantity;
//       } else {
//         prevItems.push({ productId, quantity });
//       }
//       return [...prevItems];
//     });
//     setOrderToUpdate({ _id: orderId });
//   };

//   const accept = () => {
//     if (orderIdToCancel) handleCancelOrder(orderIdToCancel);
//     setVisible(false);
//   };

//   const reject = () => {
//     toast.current.show({
//       severity: "info",
//       summary: "Action Cancelled",
//       detail: "No action taken",
//     });
//     setVisible(false);
//   };

//   useEffect(() => {
//     if (token) fetchOrders();
//   }, [token]);

//   return (
//     <>
//       <UserNavbar />
//       <Toast ref={toast} />
//       <ConfirmDialog
//         group="declarative"
//         visible={visible}
//         onHide={() => setVisible(false)}
//         message="Are you sure you want to proceed?"
//         header="Confirmation"
//         icon="pi pi-exclamation-triangle"
//         accept={accept}
//         reject={reject}
//       />
//       <div className="my-orders p-10 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
//         <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-10">
//           My Orders
//         </h1>
//         <div className="container mx-auto">
//           {data.length === 0 ? (
//             <h2 className="text-center text-2xl text-gray-600 mt-20">
//               <span className="block text-5xl">😒</span>
//               <span>Oops! You have no orders.</span>
//             </h2>
//           ) : (
//             data.map((order, index) => (
//               <div
//                 key={index}
//                 className="my-orders-order bg-white p-6 rounded-xl shadow-lg mb-8 transform transition duration-500"
//               >
//                 <div className="flex justify-between items-center mb-4">
//                   <p className="text-xl font-semibold text-gray-800">
//                     Order ID: {order._id}
//                   </p>
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       order.status === "Delivered"
//                         ? "bg-green-100 text-green-700"
//                         : order.status === "Out for Delivery"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-blue-100 text-blue-700"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </div>
//                 <p className="text-lg text-gray-600 mb-2">
//                   <strong>Total Price:</strong> {currency} {order.totalPrice}
//                 </p>
//                 <div className="order-items grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
//                   {order.items.map((item, itemIndex) => (
//                     <div
//                       key={itemIndex}
//                       className="order-item flex items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-indigo-50"
//                     >
//                       {item.productId && item.productId.image ? (
//                         <img
//                           src={`http://localhost:3000/uploads/${item.productId.image}`}
//                           alt={item.productId.name || "Product Image"}
//                           className="w-20 h-20 object-cover rounded-lg mr-4"
//                         />
//                       ) : (
//                         <p className="text-sm text-gray-400">
//                           Image not available
//                         </p>
//                       )}
//                       <div className="item-details text-gray-700 text-sm space-y-1">
//                         <p className="font-semibold text-lg">
//                           {item.productId?.name || "Product Name Not Available"}
//                         </p>
//                         <p>
//                           Quantity:{" "}
//                           <input
//                             type="number"
//                             value={item.quantity}
//                             min="1"
//                             onChange={(e) =>
//                               handleChangeQuantity(
//                                 order._id,
//                                 item.productId._id,
//                                 parseInt(e.target.value)
//                               )
//                             }
//                             className="border p-1 rounded text-sm w-16"
//                             disabled={
//                               order.status === "Delivered" ||
//                               order.status === "Out for Delivery"
//                             }
//                           />
//                         </p>
//                         <p>
//                           Price per item:{" "}
//                           <span className="font-medium">
//                             {currency} {item.productId?.price || 0}
//                           </span>
//                         </p>
//                         <p>
//                           Total:{" "}
//                           <span className="font-medium">
//                             {currency}{" "}
//                             {item.quantity * (item.productId?.price || 0)}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex justify-end mt-4">
//                   {order.status !== "Delivered" &&
//                     order.status !== "Out for Delivery" && (
//                       <button
//                         onClick={() => {
//                           setOrderIdToCancel(order._id);
//                           setVisible(true);
//                         }}
//                         className="text-sm text-red font-semibold py-1 px-3 rounded-lg transition duration-300"
//                       >
//                         <i className="pi pi-times-circle mr-1"></i>Cancel Order
//                       </button>
//                     )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default MyOrders;

import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../pages/context/StoreContext";
import UserNavbar from "../UserNavbar/UserNavbar";
import Footer from "../../pages/Footer/Footer";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token, currency } = useContext(StoreContext);
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [orderIdToCancel, setOrderIdToCancel] = useState();

  // Fetch orders from the server
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/order/user-orders",
        {},
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to fetch orders",
      });
    }
  };

<<<<<<< Updated upstream
  // Handle order cancellation
=======
>>>>>>> Stashed changes
  const handleCancelOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/order/update",
        { orderId: orderIdToCancel, cancel: true },
        { headers: { token } }
      );
<<<<<<< Updated upstream

=======
  
>>>>>>> Stashed changes
      if (response.data.success) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Order canceled successfully",
        });
<<<<<<< Updated upstream
        // Update order status to "Cancelled"
=======
  
        // Update the order status to "Cancelled" in the frontend
>>>>>>> Stashed changes
        setData((prevData) =>
          prevData.map((order) =>
            order._id === orderIdToCancel
              ? { ...order, status: "Cancelled" }
              : order
          )
        );
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to cancel order",
      });
    } finally {
      setVisible(false);
    }
  };
<<<<<<< Updated upstream

=======
  
>>>>>>> Stashed changes
  // Accept order cancellation
  const accept = () => {
    handleCancelOrder();
  };

  // Reject order cancellation
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
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to cancel this order?"
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
            data.map((order) => (
              <div
                key={order._id}
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
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
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
                  {order.status === "Cancelled" ? (
                    <button
                      className="bg-gray-300 text-gray-500 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
                      disabled
                    >
                      Order is Cancelled
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setOrderIdToCancel(order._id);
                        setVisible(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                    >
                      Cancel Order
                    </button>
                  )}
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
