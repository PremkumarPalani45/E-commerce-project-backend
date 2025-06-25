import cartModel from "./cart.model.js";
import cartRepository from "./cart.Repository.js";
import { ApplicationError } from "../../error-handling/applicatinError.js";

export default class cartItemController{
    constructor(){
        this.cartitemRepository=new cartRepository();
      }
  async  addCart(req,res){
       // console.log(req.query);
       try{
        const {productID,quantity}=req.body;
//console.log(productID)
        const userID=req.userID;
        const additem= await this.cartitemRepository.add(productID,userID,quantity)
        res.status(201).send(additem);
    }
     catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong",500)
          }
}
   async getCartitems(req,res){
        try{
        const user=req.userID;

        
       
        const items=await this.cartitemRepository.get(user);
      

        
        res.status(200).send(items);
        }
         catch(err){
                console.log(err);
                throw new ApplicationError("something went wrong",500)
              }
    }
    async deletecartItem(req,res){
        try{
        const userid=req.userID;
        const cartitemId=req.params.id;
        const error=await this.cartitemRepository.delete(cartitemId,userid);

        if(error){
            res.status(404).send(error);

        }
        else{
            res.status(200).send(`cart item deleted successfully ${cartitemId}`)
        }
    } catch(err){
        console.log(err);
        throw new ApplicationError("something went wrong",500)
      }

    }
        
        updateQuantity(req,res){
            const userid=req.userID;
            console.log(userid);
            const cartitemId=req.params.id;
            const {quantity}=req.query;
            const error=cartModel.QuantityUpdate(cartitemId,userid,quantity)
            if(error){
                res.status(404).send(error);
    
            }
            else{
                res.status(200).send(`cart item quantity updated for id: ${cartitemId}`)
            }
        }
      
}