import { ApplicationError } from "../src/error-handling/applicatinError.js";
import { likeRepository } from "./like.repository.js";


export default class LikeController{


    constructor(){
        this.likeRepository=new likeRepository();
    }
    
    async like(req,res){

        try{
         const {id,type}=req.body;
         const userID=req.userID;

         if(type!='product' && type!='category'){
            return res.status(400).send("invalid type")
         }

         if(type=='product'){
           this.likeRepository.likeProduct(userID,id)
         }
         else{
 this.likeRepository.likeCategory(userID,id)
         }
         return res.status(200).send("liked successfully");
        }
       catch(err){
                   console.log(err);
                   throw new ApplicationError("something went wrong",500)
                 }

    }

    async getLikes(req,res){
      try{
         const {id,type}=req.body;

        const likes= await this.likeRepository.getLikes(id,type)
        return res.status(200).send(likes);
      }
        catch(err){
                   console.log(err);
                   throw new ApplicationError("something went wrong",500)
                 }
    }
}