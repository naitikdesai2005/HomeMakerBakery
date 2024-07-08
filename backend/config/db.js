import mongoose from "mongoose"


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://naitikdesai:desai4720@cluster0.euppx6h.mongodb.net/homebakery').then(()=>console.log("DB connected"));

}