import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";
import bakerModel from "../models/bakerModel.js";
// import cookie from "cookie";
import productModel from "../models/productModel.js";

// Create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        const baker = await bakerModel.findOne({ email });

        if (!user && !baker) {
            return res.json({ success: false, message: "User or baker not exists" });
        }

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.json({ success: false, message: "Invalid Password" });
            }

            if (user.role === "admin") {
                const token = createToken(user._id);
                return res.json({ success: true, token, message: "admin" });
            } else if (user.role === "user") {
                const token = createToken(user._id);
                return res.json({ success: true, token, message: "user" });
            } else {
                return res.json({ success: false, message: "Role is not decided" });
            }
        }

        if (baker) {
            const isMatch = await bcrypt.compare(password, baker.password);
            if (!isMatch) {
                return res.json({ success: false, message: "Invalid Password" });
            }
            if (baker.role === "baker") {
                const token = createToken(baker._id);
                return res.json({ success: true, token, message: "baker" });
            } else {
                return res.json({ success: false, message: "Role is not decided" });
            }
        }
    } catch (error) {
        return res.json({ success: false, message: "Error" });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token, message: "user" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong!!!" });
    }
};

// Register admin
const registerAdmin = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        if (newUser.email === "Admin@gmail.com") {
            newUser.role = "admin";
        }

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token, message: "admin" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong!!!" });
    }
};

// Register baker
const registerBaker = async (req, res) => {
    const { name, password, email, bakeryname, bakeryaddress, bankAccNumber, mobilenumber } = req.body;
    try {
        const exists = await bakerModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Baker already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newBaker = new bakerModel({
            name: name,
            email: email,
            password: hashedPassword,
            bakeryname: bakeryname,
            bakeryaddress: bakeryaddress,
            bankAccNumber: bankAccNumber,
            mobilenumber: mobilenumber,
        });

        const baker = await newBaker.save();
        const token = createToken(baker._id);
        res.json({ success: true, token, message: "baker" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong!!!" });
    }
};

// Get all items
const allitem = async (req, res) => {
    try {
        const items = await productModel.find();
        if (items.length > 0) {
            res.json({ success: true, data: items });
        } else {
            res.json({ success: true, message: "No items in inventory" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" });
    }
};

// Logout user
const logout=async (req,res)=> {
    try {
        // Remove the token from local storage
        res.json({success:true,message:"Logout Successfuly"})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Something went wrong" });
    }
}

//search bakery
const search=async(req,res)=>{
  try {
    let bakeryName=req.body.bakeryName;
    let items= await productModel.find({bakeryName:bakeryName});
    res.json({success:true,data:items});
} catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
}
}


export { loginUser, registerUser, registerBaker, registerAdmin, allitem, logout ,search};
