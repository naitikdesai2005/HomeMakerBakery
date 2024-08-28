import express from "express";
import authMiddleware from "../middleware/auth.js";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";

const cartRouter=express.Router();

cartRouter.post("/addCart",authMiddleware,addToCart);
cartRouter.post("/removeCart",authMiddleware,removeFromCart);
cartRouter.get("/getCart",authMiddleware,getCart);

export default cartRouter;