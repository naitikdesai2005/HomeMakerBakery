import bakerModel from "../models/bakerModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

// const createOrder = async (req, res) => {
//   const frontend_url = "http://localhost:3000";
//   try {
//     // Find user
//     const user = await userModel.findById(req.body.userId);
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }

//     const { firstname, lastname, email, address, phone} = req.body;
//     let cartData = user.cartData;
//     let items = [];
//     let totalPrice = 0;

//     // Populate items and calculate total price
//     for (let itemId in cartData) {
//       const product = await productModel.findById(itemId);
//       if (product) {
//         const quantity = cartData[itemId];
//         items.push({
//           productId: product._id,
//           bakerId: product.bakerid,
//           quantity: quantity,
//           price:product.price
//         });
//         totalPrice += product.price * quantity;
//       }
//     }

//     // Create new order
//     const newOrder = new orderModel({
//       userId: user._id,
//       firstname,
//       lastname,
//       email,
//       address,
//       phone,
//       totalPrice,
//       items
//     });
//     const savedOrder = await newOrder.save();

//     // Update baker orders
//     for (let item of items) {
//       const baker = await bakerModel.findById(item.bakerId);
//       if (baker) {
//         baker.orders.push({
//           orderId: savedOrder._id,
//           items: [{
//             productId: item.productId,
//             quantity: item.quantity,
//             price:item.price
//           }],
//           status: "Pending"
//         });
//         await baker.save();
//       }
//     }

//     // Clear user's cart data
//     user.cartData = {};
//     await user.save();

//     // Prepare line items for payment
//     const line_items = items.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.productId.name // Assuming productId has a name property
//         },
//         unit_amount: item.productId.price * 100 * 80 // INR conversion factor
//       },
//       quantity: item.quantity
//     }));

//     // Add delivery charges
//     line_items.push({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: "Delivery Charges"
//         },
//         unit_amount: 2 * 100 * 80
//       },
//       quantity: 1
//     });

//     // // Create payment session
//     // const session = await stripe.checkout.sessions.create({
//     //   line_items: line_items,
//     //   mode: 'payment',
//     //   success_url: '${frontend_url}/verify?success=true&orderId=${savedOrder._id}',
//     //   cancel_url: '${frontend_url}/verify?success=false&orderId=${savedOrder._id}',
//     // });

//     res.json({ success: true, message: "Order created successfully", order: savedOrder});

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error creating order" });
//   }
// };

// const userOrders=async (req,res)=>{
//   try {
//     const orders=await orderModel.find({userId:req.body.userId});
//     console.log(orders);
    
//     res.json({success:true,data:orders.items});
//   } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"Error"});
//   }
// }

// export {createOrder,userOrders};
// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import bakerModel from "../models/bakerModel.js";
// import productModel from "../models/productModel.js";


const createOrder = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = user.cartData;
        const { firstname, lastname, email, address, phone } = req.body;
        let items = [];
        let totalPrice = 0;

        for (let itemId in cartData) {
            const product = await productModel.findById(itemId);
            if (product) {
                const quantity = cartData[itemId];
                items.push({
                    productId: product._id,
                    bakerId: product.bakerid,
                    quantity: quantity
                });
                totalPrice += product.price * quantity;
            }
        }

        const newOrder = new orderModel({
            userId: user._id,
            firstname,
            lastname,
            email,
            address,
            phone,
            totalPrice,
            items
        });

        const savedOrder = await newOrder.save();

        // Update baker orders
        for (let item of items) {
            const baker = await bakerModel.findById(item.bakerId);
            if (baker) {
                baker.orders.push({
                    orderId: savedOrder._id,
                    items: [{
                        productId: item.productId,
                        quantity: item.quantity
                    }],
                        status: "Pending"
                });
                await baker.save();
            }
        }

        user.cartData = {};
        await user.save();

        res.json({ success: true, message: "Order created successfully", order: savedOrder });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating order" });
    }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }

        order.status = status;

        const baker = await bakerModel.findOne({ "orders.orderId": orderId });
        if (baker) {
            for (let orderItem of baker.orders) {
                if (orderItem.orderId.toString() === orderId.toString()) {
                    orderItem.status = status;
                    break;
                }
            }
            await baker.save();
        }

        await order.save();

        res.json({ success: true, message: "Order status updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating order status" });
    }
};

export { createOrder, updateOrderStatus };
