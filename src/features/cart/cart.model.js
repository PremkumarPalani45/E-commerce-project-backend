export default class cartModel{
    constructor(id,pid,uid,quantity){
        this.id=id;
        this.product_id=pid;
        this.user_id=uid;
        this.quantity=quantity;
        //this.price=price;
      
    
    }

    static add(pid,uid,quantity){
        const cartItem=new cartModel(cartItems.length+1,pid,uid,quantity)
        cartItems.push(cartItem);
          console.log(cartItem);
        return cartItem;
    }
    static get(userid){
       
            return cartItems.filter((u)=>u.user_id==userid);
      
       
    }
    static delete(cartItemid,userid){
        const cartindex=cartItems.findIndex(c=>c.id==cartItemid && c.user_id==userid);
       if(cartindex==-1){
        return 'cart not found'
       }
       else{
        

        cartItems.splice(cartindex,1);
       }
    }
    static QuantityUpdate(cartItemid,userID,quantity){
        const cart=cartItems.find(c=>c.id==cartItemid && c.user_id==userID);

        if(cart){
             cart.quantity=quantity;
        }
        else{
            return 'cart not found'
        }
    }
}


var cartItems=[
new cartModel(
   1,1,2,1
),
new cartModel(
    2,1,1,1
 ),


]