import mongoose from "mongoose";

const {Schema}=mongoose;

export const userSchema=new Schema({
    name:String,
    email:{type:String, unique:true,
        match:[/.+\@.+\..+/,"please enter valid email"]
    }
    ,
    password:{
        type:String,
        required:true
    // validate:{
    //     validator:function(value){
    //         return  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(value);

    //     },
    //     message:"password should be between 8 - 12 characters"
    // }
},
    type:{type:String, enum:["customer","seller"]}
})