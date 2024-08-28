import userModel from "../models/userModel.js";
import { createOrder } from "./orderController.js";


// Create order from cart
const checkout = async (req, res) => {
  try {
      await createOrder(req, res);
  } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error during checkout" });
  }
};

//add items to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);

    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//fetch user cart data
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove items from the user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);

    //extract the cart data
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    //then we can update the user cart data
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


export {addToCart,getCart,removeFromCart,checkout};