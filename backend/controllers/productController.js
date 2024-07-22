import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator";
import bakerModel from "../models/bakerModel.js";
import cookie from "cookie"


const addItem=async(req,res)=>{
    try {

        let bakerData = await bakerModel.findById(req.body.userId);
        let bakerId= await bakerData.bakerId;

        const item = new productModel({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            bakerid: bakerId
        })
        await item.save();
        res.status(200).json({ message: "Item added successfully" });
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went Wrong!!!"})
    }
}

export {addItem}
