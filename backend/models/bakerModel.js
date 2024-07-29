import mongoose from "mongoose";
const bakerSchema = new mongoose.Schema({
<<<<<<< HEAD
    name: { type: String, required: true },
    bakeryname: { type: String, required: true },
    bakeryaddress: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobilenumber: { type: Number, required: true },
    bankAccNumber: { type: Number, required: true },
    role: { type: String, default: "baker" },
    products: { type: Object, default: [] },
    select: { type: Boolean, default: true },
=======
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
>>>>>>> 8741a2e56f8b78386cc46a51a92b937584d7e7f2

}, { minimize: false })

const bakerModel = mongoose.models.baker || mongoose.model("baker", bakerSchema);
export default bakerModel;