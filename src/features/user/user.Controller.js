import { ApplicationError } from '../../error-handling/applicatinError.js';
import  userModel  from './user.Model.js'

import userRepository from './user.Repository.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

export default class userController{
    
  constructor(){
    this.userRepository=new userRepository();
  }
    async userSignup(req,res,next){
      try{
     const {name,email,password,type}=req.body;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

if (!passwordRegex.test(password)) {
  return res.status(400).json({ message: "Password should be 8-12 chars, include uppercase, lowercase, number, and special char." });
}
     const hashedpassword=await bcrypt.hash(password,12)
    const user=new userModel(name,email,hashedpassword,type);
     await this.userRepository.signup(user);
     res.status(201).json({name:user.name,email:user.email,type:user.type});
    }
    catch(err){
      console.log(err);
      next(err);
      throw new ApplicationError("something went wrong",500)
    }
    }
  async  userSignin(req,res){
    try{
      const user=await this.userRepository.findUserEmail(req.body.email)
      if(!user){
        return res.status(400).send('Incorrect credentials')
      }
      else{
        // compare pass with hashed password
        const match=await bcrypt.compare(req.body.password,user.password)
        if(!match){
          return res.status(400).send('Incorrect credentials')
        }
        else{
   //create a token
   const token=jwt.sign({userid:user._id,email:user.email},process.env.JWTSECRET,{
    expiresIn:'1h'
  })
  //send a token
    res.status(200).send(token)
        }
      }
    }
    //   }
    //   const{email,password}=req.body;
    //  const sign=await this.userRepository.signIn(email,password)
    // //  console.log(sign);

    //  if(!sign){
      
    //  }
    //  else{
   
    //  }
    // }
    catch(err){
      console.log(err);
      return res.status(500).send("something went wrong")
    }
  }

  async resetPassword(req,res)
{
   const {newpassword}=req.body;
   const userid=req.userID;

   const hashpassword= await bcrypt.hash(newpassword,12);
res.status(200).send("password is reset")
   try{
await this.userRepository.resetPassword(userid,hashpassword)
   }
   catch(err){
      console.log(err);
      throw new ApplicationError("something went wrong",500)
    }
}
}