import express from "express"
import { loginUser,registerBaker } from "../controllers/userController.js"
import { addItem } from "../controllers/productController.js"

const productRoute = express.Router();

productRoute.post("/add",addItem);

export default productRoute;