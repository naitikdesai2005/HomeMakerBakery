import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const dashboard=async(req,res)=>{
  let userData=await userModel.findById(req.body.userId);

  if(userData.role=="user")
  {
    res.json({success: true, message: "role is user." })
  }
  if(userData.role=="admin")
  {
    res.json({success: true, message: "role is admin." })
  }
  if(userData.role=="baker")
  {
    res.json({success: true, message: "role is backer." })
  }
}

export {dashboard};