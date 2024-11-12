import express from "express"
import { bakerData, orderData, userData } from "../controllers/adminController.js";

const adminRouter=express.Router();

adminRouter.get("/bakersData",bakerData);
adminRouter.get("/usersData",userData);
adminRouter.get("/ordersData",orderData);

export default adminRouter;


