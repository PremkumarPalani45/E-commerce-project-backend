import { ObjectId } from "mongodb";
import { dbshare } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handling/applicatinError.js";
import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";


// creating model for schema 

const productModel= mongoose.model('product',productSchema)
const reviewModel=mongoose.model('review', reviewSchema)
const categoryModel=mongoose.model('category',categorySchema)

class productRepository{
    constructor(){
        this.collection="products"
    }
    async add(newproduct){
        try{
//   const db=dbshare();
        
//         //data.id=products.length+1;
//         const collection=db.collection(this.collection);
// await collection.insertOne(newproduct);

//         return newproduct;
  

// 1.add the product
console.log(newproduct);
       const addproduct= new productModel(newproduct)
       const saveProduct=await addproduct.save();

       //2. update the categories

       await categoryModel.updateMany(
        {_id: {$in: newproduct.categories}},
      {
        $push:{products:new ObjectId(saveProduct._id)}

      }
       )
        }
         catch(err){
                console.log(err);
                throw new ApplicationError("something went wrong",500)
              }
    }

    async get(id){
        try{
            const db=dbshare();
                  
                  //data.id=products.length+1;
                  const collection=db.collection(this.collection);
         return await collection.findOne({_id:new ObjectId(id)});
          
               
                  }
                   catch(err){
                          console.log(err);
                          throw new ApplicationError("something went wrong",500)
                        }
    }
    async getAll(){
        try{
            const db=dbshare();
                  
                  //data.id=products.length+1;
         const collection=db.collection(this.collection);
         return await collection.find({}).toArray(); 
          
               
                  }
                   catch(err){
                          console.log(err);
                          throw new ApplicationError("something went wrong",500)
                        }
    }

    async filter(minprice,categories){
     try{
        const db=dbshare();
                  
      
const collection=db.collection(this.collection);
      let filterExpression={};
      if(minprice){
        filterExpression.price={$gte:parseFloat(minprice)}
      }
      // if(maxprice){
      //   filterExpression.price={...filterExpression.price,$lte:parseFloat(maxprice)}
      // }
      if(categories){
        filterExpression ={ $or: [{categories: {$in:categories}},filterExpression]};
      }
     return collection.find(filterExpression).project({_id:0,name:1,price:1,rating:{$slice:-1}}).toArray()
    }
  catch(err){
        console.log(err);
        throw new ApplicationError("something went wrong",500)
      }
      }

        async rateProduct(userID, productID, rating) {
           try{
           //1. check if product is exists

           const productToUpdate= await productModel.findById(productID)

           if(!productToUpdate){
              throw new Error("product not found")
           }

           //2. get the existing review 

           const userReview= await reviewModel.findOne({productID:new ObjectId(productID),userID:new ObjectId(userID)})

           if(userReview){
               userReview.rating=rating;
               await userReview.save();
           }
           else{
               const newReview= new reviewModel({
                productID:new ObjectId(productID),userID:new ObjectId(userID),rating:rating
               })

               newReview.save();

           }
}
        
           
           catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong",500)
          }
           
          }

          async averageProductperCategory(){
            try{
              const db=dbshare();
                  
      
              const collection=db.collection(this.collection);

            return  await collection.aggregate([
                {
                  // stage 1 get average price per category
                   $group:{
                    _id:"$category",
                    averagePrice:{$avg:"$price"}
                   }
                  
                }
              ]).toArray();
            }
            catch(err){
              console.log(err);
              throw new ApplicationError("something went wrong",500)
            }
          }

//           async rateProduct(userID, productID, rating) {
//             try{
//              const db=dbshare();
                   
       
//              const collection=db.collection(this.collection);
//  // find the product
//  const product =await collection.findOne({_id:new ObjectId(productID)});
//  // find the rating
//  const ratings = product?.rating || [];
//  const userRating = ratings.find(r => r.userID.toString() === userID);
//  if(userRating){
//  // update the rating
//      await collection.updateOne({
//        _id:new ObjectId(productID),"rating.userID": new ObjectId(userID)}
//        ,{
//            $set:{
//              "rating.$.rating":rating
//            }
//        }
//      )
//  }
//  else{
//    await  collection.updateOne({
//      _id: new ObjectId(productID)
//    },{
//      $push:{rating:{userID:new ObjectId(userID),rating}}
//    })
//  }
         
//             }
//             catch(err){
//              console.log(err);
//              throw new ApplicationError("something went wrong",500)
//            }
            
//            }
}


export default productRepository;
