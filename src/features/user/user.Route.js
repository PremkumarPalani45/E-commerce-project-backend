
// manage route and paths of product

// import express

import express from 'express'
import userController from './user.Controller.js';
import { jwtmiddleware } from '../../middlewares/jwt.middleware.js';
//import { jwtmiddleware } from './src/middlewares/jwt.middleware.js';
//import {upload} from '../../middlewares/fileUpload.middleware.js'
// initialize express routes


const userRouter=express.Router()

const usercontroller= new userController();

userRouter.post('/signup',(req,res,next)=>{
    usercontroller.userSignup(req,res,next)
});
userRouter.post('/signin',(req,res)=>{
  usercontroller.userSignin(req,res)
});

//http://localhost:3000/api/products/filter?minPrice=10&maxPrice=20&category=Cateogory1

userRouter.put('/reset',jwtmiddleware,(req,res)=>{
  usercontroller.resetPassword(req,res)
});

export default userRouter;
