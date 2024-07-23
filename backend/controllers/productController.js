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
        let bakerId= await bakerData._id;

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

// const listItem = async (req, res) => {
//     try {
//         const bakerData = await someFunctionToGetBakerData();
//         console.log("Baker Data:", bakerData); // Debugging output
//         if (!bakerData) {
//             throw new Error("Baker data not found");
//         }
//         let bakerId = bakerData._id;
//         // Continue with your logic using bakerId
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send({ error: error.message });
//     }
// };


//all item list
// const listItem=async(req,res)=>{

//     let bakerData = await bakerModel.findById(req.body.userId);
//     let bakerId= await bakerData._id;

//     if (!bakerData) {
//         return res.json({ success: false, message: "Baker data not found." });
//       }

//     let itm = [];
//     try {
//       const Items=await productModel.find({});

//       Items.forEach(Item => {
//         if(bakerId==Item.bakerid)
//         {
//             // res.json({success:true,data:Item});
//             itm.push(Item);
//         }
//         // else
//         // {
//         //     res.json({success:false,message:"Baker has no item."})
//         // }
//       });

//       res.json({success:true,data:itm});
//     } catch (error) {
//       res.json({success:false,message:"Error"});
//     }
//   }


  const listItem = async (req, res) => {
    try {
        // Verify the token
        let bakerData = await bakerModel.findById(req.body.userId);
        // let bakerId= await bakerData._id;
        if (!bakerData) {
            return res.json({ success: false, message: "Baker not found" });
        }
  
        // Retrieve products for the baker
        const items = await productModel.find({ bakerid: bakerData._id });
        if (items.length > 0) {
            res.json({ success: true, data: items });
        } else {
            res.json({ success: false, message: "Baker has no items" });
        }
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: "Error retrieving items" });
    }
  }


export {addItem,listItem};
