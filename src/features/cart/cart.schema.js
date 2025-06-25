import mongoose from "mongoose";

const {schema}=mongoose;

const productSchema=new schema({
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'product'},
    userID:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    quantity:Number
})