import "./env.js"
import express from 'express'
import swagger from 'swagger-ui-express';
import cors from 'cors'
import bodyparser from 'body-parser'
 import productRouter from './src/features/product/product.route.js';

 import userRouter from './src/features/user/user.Route.js';
 import cartRouter from './src/features/cart/cart.route.js';
 import {connectMongodb} from './src/config/mongodb.js';



import { jwtmiddleware } from './src/middlewares/jwt.middleware.js';
//import apiDocs from './swagger.json' assert { type: 'json' };
import fs from 'fs';
import loggermiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handling/applicatinError.js';
import orderRouter from "./src/features/order/order.route.js";
import { connectUsingmongoose } from "./src/config/mongooseconfig.js";
import mongoose from "mongoose";
import likeRouter from "./like/like.route.js";

const server=express();
//load all the environment variables

const apiDocs = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));
// server.use(bodyparser.json())
server.use(express.json());

// CORS policy configuration

var corsOption={
    origin:'http://localhost:5500',
    allowedHeaders :"*"
}
server.use(cors(corsOption));

// server.use((req,res,next)=>{
//    res.header('Access-Control-Allow-Origin','http://localhost:5500') 
//    res.header('Access-Control-Allow-Headers','*') 
//    res.header('Access-Control-Allow-Methods','*') 
//    // return Ok for preflight status
//    if(req.method=='OPTIONS'){
//     return res.sendStatus(200)
//    }
//    next();
// })

server.use(loggermiddleware);

// all the request related to product will redirect to product route.
server.use("/api-docs",swagger.serve,swagger.setup(apiDocs))
server.use('/api/orders',jwtmiddleware,orderRouter)

server.use('/api/products',jwtmiddleware,productRouter)

server.use('/api/users',userRouter)

server.use('/api/carts',jwtmiddleware,cartRouter)


server.use('/api/likes',jwtmiddleware,likeRouter)

server.get('/',(req,res)=>{
    res.send('welcome to E-commerce APIs')
})

// middleware to throw error

server.use((err,req,res,next)=>{
    console.log(err);

    if(err instanceof mongoose.Error.ValidationError){
        res.status(400).send(err.message);
    }

    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    res.status(500).send('something went wrong')
})

// middleware to handle 404 requests

server.use((req,res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3020/api-docs")
})

server.listen(3020,()=>{
    console.log('server is listening at 3020')
    connectUsingmongoose();
});

