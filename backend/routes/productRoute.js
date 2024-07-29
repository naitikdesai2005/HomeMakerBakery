import express from "express"
import { loginUser,registerBaker } from "../controllers/userController.js"
import { addItem,listItem,deleteItem } from "../controllers/productController.js"
import authMiddleware from "../middleware/auth.js"
const productRoute = express.Router();

productRoute.post("/add",authMiddleware,addItem);
productRoute.get("/bakerProduct",authMiddleware,listItem);
productRoute.post("/delete",authMiddleware,deleteItem);

export default productRoute;