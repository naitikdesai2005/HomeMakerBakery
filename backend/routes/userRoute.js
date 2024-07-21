import express from "express"
import { loginUser,registerAdmin,registerUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/registerUser",registerUser)
userRouter.post("/registerAdmin",registerAdmin)
userRouter.post("/login",loginUser)

export default userRouter;