import express from "express"
import { loginUser,registerBaker } from "../controllers/userController.js"
import { addItem } from "../controllers/productController.js"
import authMiddleware from "../middleware/auth.js"
const productRoute = express.Router();

productRoute.post("/add",authMiddleware,addItem);

export default productRoute;