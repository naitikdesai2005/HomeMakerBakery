import express from "express";
import { createOrder, updateOrderStatus, getBakerOrders, verifyOrder, getUserOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.post("/update-status", updateOrderStatus);
orderRouter.get("/baker-orders", getBakerOrders);
orderRouter.post("/verifyOrder", verifyOrder);
orderRouter.post("/user-orders", authMiddleware, getUserOrders);
// orderRouter.post("/cancel-order",authMiddleware, cancelOrder);

export default orderRouter;
