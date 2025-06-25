import { ApplicationError } from "../../error-handling/applicatinError.js";
import orderRepository from "./order.Reporsitory.js";

export default class orderController{
   

    constructor(){
        this.orderRepository= new orderRepository();
    }

    async placeOrder(req,res,next){
      try{
            const userId= req.userID;
         console.log(userId);
         await   this.orderRepository.placeOrder(userId);

         res.status(201).send("order is created..");
      }
    catch(err){
       console.log(err);
       throw new ApplicationError("something went wrong",500)
     }
    }
}