import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    bakerid:{type: mongoose.Schema.Types.ObjectId,
        ref: 'baker',
        required: true},
    price:{type:Number,required:true},
    image:{type:String},
    category:{type:String,required:true},

},{minimize:false})

const productModel = mongoose.models.product || mongoose.model("product",productSchema);
export default productModel;