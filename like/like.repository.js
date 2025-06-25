import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import { likeSchema } from "./like.schema.js"
import { ApplicationError } from "../src/error-handling/applicatinError.js";



 const likeModel= mongoose.model('like',likeSchema)

export class likeRepository{

     async getLikes(id,type){
         return await likeModel.find({
            likable:new ObjectId(id),
            types:type
         }).populate('user').populate({path:'likable',model:type})

     }


     async likeProduct(userid,productid){
      

        try{

            const newLike= new likeModel({
                user:new ObjectId(userid),
                likable:new  ObjectId(productid),
                types:'product'

            })

            await newLike.save();

        }
        catch(err){
                console.log(err);
                throw new ApplicationError("something went wrong",500)
              }
     }

      async likeCategory(userid,categoryid){
 const newLike= new likeModel({
                user: new ObjectId(userid),
                likable: new ObjectId(categoryid),
                types:'category'

            })
 await newLike.save();
     }
    }
