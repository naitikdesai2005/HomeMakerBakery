import express from "express"
import { bakerData, userData } from "../controllers/adminController.js";

const adminRouter=express.Router();

adminRouter.get("/bakersData",bakerData);
adminRouter.get("/usersData",userData);

export default adminRouter;


