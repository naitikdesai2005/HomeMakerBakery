import express from "express"
<<<<<<< Updated upstream
import { bakerData, orderData, userData, dashboardData } from "../controllers/adminController.js";
=======
import { bakerData, orderData, userData,dashboardData} from "../controllers/adminController.js";
>>>>>>> Stashed changes

const adminRouter = express.Router();

<<<<<<< Updated upstream
adminRouter.get("/bakersData", bakerData);
adminRouter.get("/usersData", userData);
adminRouter.get("/ordersData", orderData);
adminRouter.get("/dashdata", dashboardData);

=======
adminRouter.get("/bakersData",bakerData);
adminRouter.get("/usersData",userData);
adminRouter.get("/ordersData",orderData);
adminRouter.get("/dashboard", dashboardData);
>>>>>>> Stashed changes
export default adminRouter;


