import mongoose from "mongoose";

const {Schema}=mongoose;


export const categorySchema= new Schema({
    name:String,
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'product'
        }
    ]
})