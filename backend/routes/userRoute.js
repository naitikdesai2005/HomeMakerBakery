import express from "express"
import { loginUser,registerAdmin,registerUser,allitem, logout,search } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/registerUser",registerUser)
userRouter.post("/registerAdmin",registerAdmin)
userRouter.post("/login",loginUser)
userRouter.get("/getallitem",allitem)
userRouter.get("/logout",logout)
userRouter.post("/searchBakery",search)

export default userRouter;