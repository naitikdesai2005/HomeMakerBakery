import express from "express";
import { createOrder ,userOrders} from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/create",authMiddleware,createOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);

export default orderRouter;