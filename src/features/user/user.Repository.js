import mongoose from 'mongoose';

import {userSchema} from '../user/user.schema.js'
import { ApplicationError } from '../../error-handling/applicatinError.js';


// creating model from schema
const userModel= mongoose.model('user',userSchema)



export default class userRepository{

    async signup(user){
        //  create instance of model as document
      try{
        const newUser= new userModel(user);

        await newUser.save();
        return newUser;
      }
       catch(err){
              console.log(err);
              if(err instanceof mongoose.Error.ValidationError){
                throw (err);
                
              }
              else{

              
              throw new ApplicationError("something went wrong",500)
              }
            }

    }
    async signin(){
 try{
      return await userModel.findOne({email,password})
      }
       catch(err){
              console.log(err);
              throw new ApplicationError("something went wrong",500)
            }

    }

     async findUserEmail(email){
    
            //get the database
              
               try{
          
               return await userModel.findOne({email});
                
               }
               catch(err){
                 console.log(err);
                 throw new ApplicationError("something went wrong",500)
               }
               
             }

             async resetPassword(userid,newpass){
    try{
        
              let user= await userModel.findById(userid);
                if(user){
                    user.password=newpass;
                    user.save();
                }
                else{
                    throw new Error("user not found")
                }
               }
               catch(err){
                 console.log(err);
                 throw new ApplicationError("something went wrong",500)
               }
             }
}