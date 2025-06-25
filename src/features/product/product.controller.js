import userModel from "../user/user.Model.js";
import productModel from "./product.Model.js";
import productRepository from "./product.Repository.js";
import { ApplicationError } from "../../error-handling/applicatinError.js";
import mongoose from "mongoose";


export default class productController{

  constructor(){
    this.productRepository=new productRepository();
  }
   async  getAllProducts(req,res){
    try{
     const products=await this.productRepository.getAll();

     res.status(200).json(products)
    }
   catch(err){
        console.log(err);
        throw new ApplicationError("something went wrong",500)
      }
    }
    async addProduct(req,res){
        // // console.log(req.body);
        //    console.log('this is post req1')
        try{
        const {name,desc,price,sizes,categories}=req.body;

        const newproduct={
          name:name,
          desc:desc,
          price:parseFloat(price),
          categories: categories
    .split(',')
     .map(id => new mongoose.Types.ObjectId(id.trim())),
          size:sizes?.split(','),
          imageUrl: req.file?.filename ?? null,
        }
         await this.productRepository.add(newproduct);
           res.status(201).send(newproduct);
      }
      catch(err){
        console.log(err);
        throw new ApplicationError("something went wrong",500)
      }
    }
   async rateProduct(req, res,next) {
      try{
      const userID = req.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;

      console.log('hello')
      console.log(userID);
    
      const error = await this.productRepository.rateProduct(userID, productID, rating);
    
   
    // if(error){
    //   return res.status(400).send(error);
    // }
    //  else
        return res.status(200).send("Rating submitted successfully");
      }
      catch(err){
        console.log(err);
        console.log('passing error to middleware')
        next(err);
      }
    }
  async  getOneProduct(req,res){
  try{
      const id=req.params.id;

      

      const result=await this.productRepository.get(id);
     if(!result){
      res.status(404).send('product not found');
     }
     else{
        return res.status(200).send(result)
     }
    }
    catch(err){
      console.log(err);
      throw new ApplicationError("something went wrong",500)
    }

    }
async filterProduct(req,res){
  try{
     const minprice=req.query.minprice;
     const maxprice=req.query.maxprice;
     const categories=req.query.category;
    //  console.log(`${minprice,maxprice,category}`)
     const result=await this.productRepository.filter(minprice,categories);
     console.log(result);
     res.status(200).send(result)
  }
  catch(err){
    console.log(err);
    throw new ApplicationError("something went wrong",500)
  }
}

async averagePrice(req,res,next){
  try{
   const avgPricepercat=  await this.productRepository.averageProductperCategory();
   res.status(200).send(avgPricepercat);
  }
  catch(err){
    console.log(err);
    throw new ApplicationError("something went wrong",500)
  }
}

   
   
}