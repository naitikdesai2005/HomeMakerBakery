import express from "express";
import { createOrder , updateOrderStatus,getBakerOrders, verifyOrder} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/create",authMiddleware,createOrder);
// orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.post("/update-status", authMiddleware, updateOrderStatus);
orderRouter.get("/baker-orders", getBakerOrders);
orderRouter.post("/verifyOrder", verifyOrder);

export default orderRouter;
