import mongoose, { Schema } from "mongoose";


export const likeSchema= new Schema({


    user:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    likable:{
          type:  mongoose.Schema.Types.ObjectId,
        refPath:'types'
    },
    types:{
        type:String,
        enum:['product','category']
    }

}).pre('save',(next)=>{
   console.log("new like is coming in")
   next();
}).post('save',(doc)=>{
    console.log("new like saved")
    console.log(doc)
}).pre('find',(next)=>{
    console.log("retrieve likes")
    next();
}).post('find',(doc)=>{
    console.log("likes received")
    console.log(doc)
})
