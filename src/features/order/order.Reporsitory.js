import { ObjectId } from "mongodb";
import { dbshare } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handling/applicatinError.js";
import orderModel from "./order.Model.js";
import { getClient } from "../../config/mongodb.js";


export default class orderRepository{

    constructor(){
        this.collection="orders";
       
    }
// get cart items and calculate total 
    async placeOrder(userID){
      const client=getClient();
        const session=client.startSession();
      const db=dbshare();
      try{
        
        await session.startTransaction();
     
     const items=  await this.getTotalAmount(userID,session);
     const finalTotal=items.reduce((acc,item)=>
      acc+item.totalAmount,0
   )
     console.log(finalTotal);
      // 2. create an order record
      const order= new orderModel(new ObjectId(userID),finalTotal,new Date())
 
      await db.collection("orders").insertOne(order,{session});
  


      //3. reduce the stocks
     
      for(let item of items){
        console.log("this is items:"+item.productID + item.quantity)
        await db.collection("products").updateOne({
          _id:new ObjectId(item.productID)

        },
        {
          $inc:{stock: - item.quantity}
        },
        {session}
      );
      }
      //4. clear the cart items

      await db.collection("carts").deleteMany({
        userID: new ObjectId(userID)
      })
      await session.commitTransaction();
   
    }
    catch(err){
      await session.abortTransaction();
    
      console.log(err);
      throw new ApplicationError("something went wrong",500)
    }
    finally {
      await session.endSession(); // ✅ Always end session
      console.log("Session ended");
    }
  
  }

    async getTotalAmount(userID,session){
      try{
        const db=dbshare();
              
              //data.id=products.length+1;
              const collection=db.collection("carts");

// get cart item for user
          const items= await collection.aggregate([{
                      $match:{userID: new ObjectId(userID)}
              },

              //get a matching product from product collection using lookup
              {
                $lookup:{
                  from:"products",
                  localField:"productID",
                  foreignField:"_id",
                  as:"productInfo"
                }
              },
              // unwind the productInfo
              {
                $unwind:"$productInfo"

                
              },

              // calculate total amount for each cart item.

              {
                $addFields:{
                  "totalAmount":{
                    $multiply:["$quantity","$productInfo.price"]
                }
              }
              }

              ],{session}).toArray();

             return items;
              
    }
    catch(err){
      console.log(err);
      throw new ApplicationError("something went wrong",500)
    }
  }
}