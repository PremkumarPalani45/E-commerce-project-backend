import mongoose from "mongoose";

const {Schema}=mongoose;

export const productSchema=new Schema({
    name:String,
    category:String
    ,
    description:String,
    price:Number,
    
    sizes:{type:String, enum:["M","L","S","XL"]},
    instock:Number,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"review"
        }
    ],
    categories:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"category"
        }
    ]
})


