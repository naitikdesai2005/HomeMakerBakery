import bakerModel from "../models/bakerModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const bakerData = async (req, res) => {
  try {
    const bakersData = await bakerModel.find();

    if (!bakersData) {
      return res
        .status(404)
        .json({ status: false, message: "Bakers data not found" });
    }
 
    console.log(bakersData);

    return res.status(200).json({
      status:true,
      data:bakersData
    })

  }catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


const userData = async (req, res) => {
  try {
    const usersData = await userModel.find().lean(); // Using lean() to improve performance if you don't need full mongoose objects
    const usersWithOrders = await Promise.all(
      usersData.map(async (user) => {
        const orderCount = await orderModel.countDocuments({ userId: user._id });
        return { ...user, orderCount }; // Add orderCount to each user object
      })
    );

    if (!usersWithOrders.length) {
      return res.status(404).json({ status: false, message: "Users data not found" });
    }

    console.log(usersWithOrders);
    return res.status(200).json({ status: true, data: usersWithOrders });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};



const orderData = async (req, res) => {
  try {
    const ordersData = await orderModel.find();

    if (!ordersData) {
      return res
        .status(404)
        .json({ status: false, message: "Orders data not found" });
    }
 
    console.log(ordersData);

    return res.status(200).json({
      status:true,
      data:ordersData
    })

  }catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};


export { bakerData,userData,orderData};
