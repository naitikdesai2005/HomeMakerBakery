import mongoose from "mongoose";
const bakerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    bakeryname:{type:String,required:true},
    bakeryaddress:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    mobilenumber:{type:Number,required:true},
    bankAccNumber:{type:Number,required:true},
    role:{type:String,default:"baker"},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
    select:{type:Boolean,default:true},

},{minimize:false})

const bakerModel = mongoose.models.baker || mongoose.model("baker",bakerSchema);
export default bakerModel;