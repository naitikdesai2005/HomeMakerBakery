import express from "express"
import { dashboard } from "../controllers/dashboardController.js";

const dashboardRouter = express.Router()

dashboardRouter.get("/dashboard",dashboard);

export default dashboardRouter;