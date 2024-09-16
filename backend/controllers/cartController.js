import userModel from "../models/userModel.js";
import { createOrder } from "./orderController.js";

// Create order from cart
const checkout = async (req, res) => {
  try {
    await createOrder(req, res);
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error during checkout" });
  }
};

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.json({ success: false, message: "Missing userId or itemId" });
    }

    let userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData is initialized

    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};

// Fetch user cart data
const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Missing userId" });
    }

    let userData = await userModel.findById(userId);
    if (!userData || !userData.cartData) {
      return res.json({ success: false, message: "No cart data found" });
    }

    let cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error retrieving cart" });
  }
};

// Remove items from the user cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.json({ success: false, message: "Missing userId or itemId" });
    }

    let userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // Ensure cartData is initialized

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;

      if (cartData[itemId] === 0) {
        delete cartData[itemId]; // Remove item from cart if quantity is zero
      }

      await userModel.findByIdAndUpdate(userId, { cartData });
      return res.json({ success: true, message: "Removed From Cart" });
    } else {
      return res.json({ success: false, message: "Item not in cart" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};

export { addToCart, getCart, removeFromCart, checkout };
