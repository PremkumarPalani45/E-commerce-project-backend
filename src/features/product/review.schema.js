import mongoose from "mongoose";

const {Schema}=mongoose;

export const reviewSchema=new Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    rating:Number
})
