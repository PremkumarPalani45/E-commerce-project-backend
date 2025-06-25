import { dbshare } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handling/applicatinError.js";


class userRepository{
    // constructor(id,name,email,password,type){
    //     this._id=id;
    //     this.name=name;
    //     this.email=email;
    //     this.password=password;
    //     this.type=type;
       
    constructor(){
      this.collection="users"
  }

    // }
   async signup(newUser){

   //get the database
     
      try{
        const db=dbshare();
        // create a collection
        const collection=db.collection(this.collection);
       console.log(newUser);
        // insert into mongo db
       await collection.insertOne(newUser);
       return newUser;
      }
      catch(err){
        console.log(err);
        throw new ApplicationError("something went wrong",500)
      }
      
    }
    async signIn(email,password){

      //get the database
        
         try{
           const db=dbshare();
           // create a collection
           const collection=db.collection(this.collection);
         // console.log(newUser);
           // insert into mongo db
         return await collection.findOne({email,password});
          //return newUser;
         }
         catch(err){
           console.log(err);
           throw new ApplicationError("something went wrong",500)
         }
         
       }
       async findUserEmail(email){

        //get the database
          
           try{
             const db=dbshare();
             // create a collection
             const collection=db.collection(this.collection);
           // console.log(newUser);
             // insert into mongo db
           return await collection.findOne({email});
            //return newUser;
           }
           catch(err){
             console.log(err);
             throw new ApplicationError("something went wrong",500)
           }
           
         }
}

export default userRepository;