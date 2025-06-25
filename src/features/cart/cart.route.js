
// manage route and paths of product

// import express

import express from 'express'
import cartItemController from './cart.controller.js'

// initialize express routes


const cartRouter=express.Router()

const cartcontroller= new cartItemController();

cartRouter.delete('/:id',(req,res)=>{
    cartcontroller.deletecartItem(req,res)
})
cartRouter.put('/:id',(req,res)=>{
    cartcontroller.updateQuantity(req,res)
})
cartRouter.post('/add',(req,res)=>{
    cartcontroller.addCart(req,res)
})

cartRouter.get('/cartitems',(req,res)=>{
    cartcontroller.getCartitems(req,res)
})





//http://localhost:3000/api/products/filter?minPrice=10&maxPrice=20&category=Cateogory1



export default cartRouter;
