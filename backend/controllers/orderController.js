import bakerModel from "../models/bakerModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = user.cartData;
    const { firstname, lastname, email, address, phone } = req.body;
    let items = [];
    let totalPrice = 0;

    for (let itemId in cartData) {
      const product = await productModel.findById(itemId);
      if (product) {
        const quantity = cartData[itemId];
        items.push({
          productId: product._id,
          bakerId: product.bakerid,
          quantity,
          price: product.price,
        });
        totalPrice += product.price * quantity;
      }
    }

    const newOrder = new orderModel({
      userId: user._id,
      firstname,
      lastname,
      email,
      address,
      phone,
      totalPrice,
      items,
    });

    const savedOrder = await newOrder.save();

    // Update baker orders
    for (let item of items) {
      const baker = await bakerModel.findById(item.bakerId);
      if (baker) {
        baker.orders.push({
          orderId: savedOrder._id,
          items: [
            {
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            },
          ],
          status: "Pending",
        });
        await baker.save();
      }
    }

    user.cartData = {};
    await user.save();

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },

        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 40 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${savedOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${savedOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    // console.error("Error creating order:", error.message);
    res.json({ success: false, message: "Error creating order" });
  }
};

//payment varification function
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    //if payment is successful
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      //if payment is fail
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const getBakerOrders = async (req, res) => {
  try {
    const bakerId = req.body.bakerId;
    const orders = await orderModel.find({ bakerId: bakerId });
    res.json({ success: true, orders: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error retrieving orders" });
  }
};

// const createOrder = async (req, res) => {
//     try {
//         const user = await userModel.findById(req.body.userId);
//         if (!user) {
//             return res.json({ success: false, message: "User not found" });
//         }

//         let cartData = user.cartData;
//         const { firstname, lastname, email, address, phone } = req.body;
//         let items = [];
//         let totalPrice = 0;

//         for (let itemId in cartData) {
//             const product = await productModel.findById(itemId);
//             if (product) {
//                 const quantity = cartData[itemId];
//                 items.push({
//                     productId: product._id,
//                     bakerId: product.bakerid,
//                     quantity: quantity,
//                     price: product.price
//                 });
//                 totalPrice += product.price * quantity;
//             }
//         }

//         const newOrder = new orderModel({
//             userId: user._id,
//             firstname,
//             lastname,
//             email,
//             address,
//             phone,
//             totalPrice,
//             items
//         });

//         const savedOrder = await newOrder.save();

//         // Update baker orders
//         for (let item of items) {
//             const baker = await bakerModel.findById(item.bakerId);
//             if (baker) {
//                 baker.orders.push({
//                     orderId: savedOrder._id,
//                     items: [{
//                         productId: item.productId,
//                         quantity: item.quantity,
//                         price: item.price
//                     }],
//                     status: "Pending"
//                 });
//                 await baker.save();
//             }
//         }

//         user.cartData = {};
//         await user.save();

//         res.json({ success: true, message: "Order created successfully", order: savedOrder });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error creating order" });
//     }
// };

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    order.status = status;

    const baker = await bakerModel.findOne({ "orders.orderId": orderId });
    if (baker) {
      for (let orderItem of baker.orders) {
        if (orderItem.orderId.toString() === orderId.toString()) {
          orderItem.status = status;
          break;
        }
      }
      await baker.save();
    }

    await order.save();

    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating order status" });
  }
};

// Get user orders with baker details
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find orders placed by the user
    const userOrders = await orderModel.find({ userId }).populate({
      path: 'items.bakerId', // Populate the baker details for each order
      select: 'bakeryname'
    });

    if (userOrders.length === 0) {
      return res.json({ success: false, message: "No orders found for the user" });
    }

    // Respond with the user's orders including the baker details
    res.json({ success: true, orders: userOrders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error retrieving orders" });
  }
};

export { createOrder, updateOrderStatus, getBakerOrders, verifyOrder, getUserOrders };
