// manage route and paths of product

// import express

import express from 'express'
import orderController from './order.controller.js'
import {upload} from '../../middlewares/fileUpload.middleware.js'
import { jwtmiddleware } from '../../middlewares/jwt.middleware.js'
// initialize express routes


const orderRouter=express.Router()

const ordercontroller= new orderController();

orderRouter.post('/placeorder',(req,res,next)=>{
    ordercontroller.placeOrder(req,res,next)
})



export default orderRouter;