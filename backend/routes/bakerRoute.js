import express from "express"
import { loginUser,registerBaker } from "../controllers/userController.js"

const bakerRouter = express.Router()

bakerRouter.post("/registerBaker",registerBaker)
bakerRouter.post("/login",loginUser)

export default bakerRouter;