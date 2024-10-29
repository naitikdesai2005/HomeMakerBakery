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
    let bakerItemsMap = {}; // To group items by baker ID

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

        // Grouping items by bakerId
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
      totalPrice,
      items,
    });

    const savedOrder = await newOrder.save();

    // Update each baker with only their specific items
    for (let bakerId in bakerItemsMap) {
      const baker = await bakerModel.findById(bakerId);
      if (baker) {
        baker.orders.push({
          orderId: savedOrder._id,
          items: bakerItemsMap[bakerId], // Only items for this baker
          status: "Pending",
        });
        await baker.save();
      }
    }

    // Clear the user’s cart
    user.cartData = {};
    await user.save();

    // Stripe session setup
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.productId, // Make sure `product.name` is available for each item
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        product_data: { name: "Delivery Charges" },
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
    res.json({ success: false, message: "Error creating order" });
  }
};


// const verifyOrder = async (req, res) => {
//   const { orderId, success } = req.body;
//   try {
//     if (success === "true") {
//       await orderModel.findByIdAndUpdate(orderId, { payment: true });
//       const order = await orderModel.findById(orderId); // Retrieve order details
//       res.json({ success: true, message: "Paid", order }); // Return order details
//     } else {
//       await orderModel.findByIdAndDelete(orderId);
//       res.json({ success: false, message: "Not Paid" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// // Fetch user orders
// const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const userOrders = await orderModel.find({ userId }).populate({
//       path: 'items.bakerId',
//       select: 'bakeryname'
//     });

//     if (userOrders.length === 0) {
//       return res.json({ success: false, message: "No orders found for the user" });
//     }
//     res.json({ success: true, orders: userOrders });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: "Error retrieving orders" });
//   }
// };

// const getBakerOrders = async (req, res) => {
//   try {
//     const bakerId = req.body.bakerId;
//     const orders = await orderModel.find({ bakerId: bakerId });
//     res.json({ success: true, orders: orders });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, message: "Error retrieving orders" });
//   }
// };

// // Update Order Status
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body;
//     const order = await orderModel.findById(orderId);
//     if (!order) {
//       return res.json({ success: false, message: "Order not found" });
//     }

//     order.status = status;

//     const baker = await bakerModel.findOne({ "orders.orderId": orderId });
//     if (baker) {
//       for (let orderItem of baker.orders) {
//         if (orderItem.orderId.toString() === orderId.toString()) {
//           orderItem.status = status;
//           break;
//         }
//       }
//       await baker.save();
//     }

//     await order.save();

//     res.json({ success: true, message: "Order status updated" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error updating order status" });
//   }
// };


const placeOrderCod = async (req, res) => {

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: true,
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// Listing Order for Admin panel
const getBakerOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// User Orders for Frontend
// const getUserOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({ userId: req.body.userId });
//     res.json({ success: true, data: orders })
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" })
//   }
// }

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

const updateOrderStatus = async (req, res) => {
  console.log(req.body);
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" })
  } catch (error) {
    res.json({ success: false, message: "Error" })
  }

}

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
