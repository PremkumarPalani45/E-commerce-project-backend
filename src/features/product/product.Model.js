import { ApplicationError } from "../../error-handling/applicatinError.js";
import userModel from "../user/user.Model.js";

export default class productModel{
    constructor(id,name,desc,price,imageUrl,category,sizes){
       //this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category=category;
       
        this.sizes=sizes;
       

    }

    static filter(minprice,maxprice,category){
     
      const result=products.filter((p)=> {
       return(
        (!minprice || p.price>=minprice)
         &&(!maxprice || p.price<=maxprice)
          && (!category || p.category==category)
       );
      
    })
   
    return result;
    }

    static rateProduct(userID, productID, rating) {
      const user = userModel.getAll().find(u => u.id == userID);
      if (!user) 
        // user defined error
        throw new ApplicationError('User not found',404);
    
      const product = products.find(p => p.id == productID);
      console.log(product);
      if (!product)  throw new ApplicationError('Product not found',400);
    
      if (!product.rating) {
        product.rating = [];
      }
    
      const existingRatingIndex = product.rating.findIndex(r => r.userID == userID);
    
      if (existingRatingIndex !== -1) {
        product.rating[existingRatingIndex].rating = rating;
      } else {
        product.rating.push({ userID, rating });
      }
    
      return null;
    }
    
}
var products = [
    new productModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Cateogory1'
    ),
    new productModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory2',
      ['M', 'XL']
    ),
    new productModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )];