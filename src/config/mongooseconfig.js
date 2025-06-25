import mongoose from 'mongoose'
import { categorySchema } from '../features/product/category.schema.js';

const url=process.env.DB_URL;

export const connectUsingmongoose= async()=>{
    try{
        await mongoose.connect(url);
        console.log("MongoDB connected using Mongoose.");

         AddCategory();
    }
    catch(err){
        console.log(err);
    }
}

async function AddCategory() {

    const categoryModel=new mongoose.model('category',categorySchema)

    const categories= await categoryModel.find();
    if(!categories || categories.length==0){
        await categoryModel.insertMany([{name:'Books'},{name:'clothes'},{name:'Electronics'}])

    }
    console.log("categories are added")
    
}