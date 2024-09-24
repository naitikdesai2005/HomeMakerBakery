import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref:'user',required: true },
    bakerID:{ type: mongoose.Schema.Types.ObjectId, ref:'baker',required: true },
    rating:{type:Number,min: 1, max: 5},
    description:{type:String,required:true}
},{minimize:false})

const reviewModel = mongoose.models.review || mongoose.model("review",reviewSchema);
export default reviewModel;