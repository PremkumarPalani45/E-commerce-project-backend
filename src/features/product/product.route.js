
// manage route and paths of product

// import express

import express from 'express'
import productController from './product.controller.js'
import {upload} from '../../middlewares/fileUpload.middleware.js'
import { jwtmiddleware } from '../../middlewares/jwt.middleware.js'
// initialize express routes


const productRouter=express.Router()

const productcontroller= new productController();
productRouter.post('/rate',(req,res,next)=>{
    productcontroller.rateProduct(req,res,next)
})
productRouter.get('/filter',(req,res)=>{
    productcontroller.filterProduct(req,res)
})
productRouter.get('/',(req,res)=>{
    productcontroller.getAllProducts(req,res)
})
productRouter.post('/',upload.single('imageURL'),(req,res)=>{
    productcontroller.addProduct(req,res)
});
productRouter.get('/averagePrice',(req,res)=>{
    productcontroller.averagePrice(req,res)
});
productRouter.get('/:id',(req,res)=>{
    productcontroller.getOneProduct(req,res)
});




//http://localhost:3000/api/products/filter?minPrice=10&maxPrice=20&category=Cateogory1



export default productRouter;
