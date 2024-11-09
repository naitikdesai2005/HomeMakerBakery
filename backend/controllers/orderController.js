import bakerModel from "../models/bakerModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createOrder = async (req, res) => {
  const frontend_URL = "http://localhost:5173";
  const deliveryCharge = 40;
  const currency = "inr";

  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const { firstname, lastname, email, address, phone } = req.body;
    const cartData = user.cartData;
    let items = [];
    let totalPrice = 0;
    let bakerItemsMap = {};

    for (let itemId in cartData) {
      const product = await productModel.findById(itemId);
      if (product) {
        const quantity = cartData[itemId];
        const itemPrice = product.price * quantity;
        items.push({
          productId: product._id,
          bakerId: product.bakerid,
          quantity,
          price: product.price,
        });
        totalPrice += itemPrice;

        if (!bakerItemsMap[product.bakerid]) {
          bakerItemsMap[product.bakerid] = [];
        }
        bakerItemsMap[product.bakerid].push({
          productId: product._id,
          quantity,
          price: product.price,
        });
      }
    }

    const newOrder = new orderModel({
      userId: user._id,
      firstname,
      lastname,
      email,
      address,
      phone,
      totalPrice: totalPrice + deliveryCharge,
      items,
    });
    const savedOrder = await newOrder.save();

    for (let bakerId in bakerItemsMap) {
      const baker = await bakerModel.findById(bakerId);
      if (baker) {
        baker.orders.push({
          orderId: savedOrder._id,
          items: bakerItemsMap[bakerId],
          status: "Pending",
        });
        await baker.save();
      }
    }

    user.cartData = {};
    await user.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.productId.toString(),
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_URL}/verify?success=true&orderId=${savedOrder._id}`,
      cancel_url: `${frontend_URL}/verify?success=false&orderId=${savedOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error creating order" });
  }
};


const getBakerOrders = async (req, res) => {
  try {
    const bakerId = req.body.userId;

    const baker = await bakerModel.findById(bakerId);
    if (!baker) {
      return res.status(404).json({ success: false, message: "Baker not found" });
    }

    const formattedOrders = [];

    for (const orderInfo of baker.orders) {
      const order = await orderModel.findById(orderInfo.orderId).populate('items.productId', 'name price image');

      if (!order) continue;

      const orderDetails = {
        user: {
          name: order.firstname + ' ' + order.lastname,
          email: order.email,
          phone: order.phone,
          address: order.address
        },
        items: order.items.map(item => ({
          name: item.productId.name,
          quantity: item.quantity,
          price: item.productId.price,
          image: item.productId.image,
        })),
        totalPrice: order.totalPrice,
        status: order.status
      };

      formattedOrders.push(orderDetails);
    }

    res.json({ success: true, data: formattedOrders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error retrieving orders" });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const bakerId = req.body.userId; // Get the baker's ID from the request body populated by middleware
    const { orderId, status } = req.body;

    // Validate incoming request
    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Order ID and status are required." });
    }

    // Find the order to check if it exists
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    // Check if the order belongs to the baker
    // if (order.bakerId.toString() !== bakerId) {
    //   return res.status(403).json({ success: false, message: "Forbidden. You do not have permission to update this order." });
    // }

    // Update the order status
    order.status = status; // Update the status field
    await order.save(); // Save the updated order

    res.json({ success: true, message: "Status updated successfully." });
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({ success: false, message: "Error updating order status." });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId }).populate({
      path: 'items.productId',
      select: 'name price image',
    });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error retrieving orders" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" })
    }
    else {
      await orderModel.findByIdAndDelete(orderId)
      res.json({ success: false, message: "Not Paid" })
    }
  } catch (error) {
    res.json({ success: false, message: "Not  Verified" })
  }
}

export { createOrder, updateOrderStatus, getBakerOrders, verifyOrder, getUserOrders };
