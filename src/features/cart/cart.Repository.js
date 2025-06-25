import { ObjectId, ReturnDocument } from "mongodb";
import { dbshare } from "../../config/mongodb.js"
import { ApplicationError } from "../../error-handling/applicatinError.js";


class cartRepository{
    constructor(){
        this.collection="carts"
    }
    async add(pid,uid,quantity){
     try{
        const db=dbshare();
        const collection=db.collection(this.collection);
        
       
        const productID=new ObjectId(pid);
const userID= new ObjectId(uid);
const id= await this.cartidupdate(db);
console.log(id);
      // const     quantity=parseInt(quantity);
        
        //find the document

        //either insert or update
     return  await collection.updateOne({
        productID:productID ,userID:userID
     },
    {   
        $setOnInsert:{_id:id},
        $inc:{quantity:quantity}
    },{upsert:true});
     }
     catch(err){
        console.log(err);
        throw new ApplicationError("something went wrong",500)
      }
         }
    async get(userid){
        try{
            const db=dbshare();
            const collection=db.collection(this.collection);
            return await collection.find({userID:new ObjectId(userid)}).toArray();
        }
        catch(err){
            console.log(err);
            throw new ApplicationError("something went wrong",500)
          }
       
    }
    async delete(cartItemid,userid){
        try{
            const db=dbshare();
            const collection=db.collection(this.collection);
        await collection.deleteOne({userID:new ObjectId(userid)},{_id: new ObjectId(cartItemid)})
    }
       catch(err){
        console.log(err);
        throw new ApplicationError("something went wrong",500)
      }
    }
    // static QuantityUpdate(cartItemid,userID,quantity){
    //     const cart=cartItems.find(c=>c.id==cartItemid && c.user_id==userID);

    //     if(cart){
    //          cart.quantity=quantity;
    //     }
    //     else{
    //         return 'cart not found'
    //     }
    // }
    async cartidupdate(db){
     const resultDocument=   await db.collection("counters").findOneAndUpdate({_id:"cartitemId"},
            {$inc:{value:1}},
            {returnDocument:'after'}
        )
        console.log(resultDocument);
       
        return resultDocument.value;
    }

}


export default cartRepository;