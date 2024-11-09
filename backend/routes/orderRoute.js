import express from "express";
import { createOrder, updateOrderStatus, getBakerOrders, verifyOrder, getUserOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/create", authMiddleware,createOrder);
orderRouter.post("/update-status", authMiddleware,updateOrderStatus);
orderRouter.get("/baker-orders",authMiddleware, getBakerOrders);
orderRouter.post("/verifyOrder", authMiddleware,verifyOrder);
orderRouter.post("/user-orders", authMiddleware, getUserOrders);
// orderRouter.post("/cancel-order",authMiddleware, cancelOrder);

export default orderRouter;
