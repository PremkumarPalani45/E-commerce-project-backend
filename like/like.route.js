import express from 'express';

import LikeController from './like.controller.js';


 const likeRouter=express.Router();

const likecontroller= new LikeController();



likeRouter.post('/',(req,res)=>{
    likecontroller.like(req,res)
}
)


likeRouter.get('/',(req,res)=>{
    likecontroller.getLikes(req,res)
}
)




export default likeRouter;
