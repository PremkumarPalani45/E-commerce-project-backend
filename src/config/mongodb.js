import { Collection, MongoClient } from "mongodb";
// import dotenv from 'dotenv';

// dotenv.config();



let client;
export const connectMongodb=()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(clientInstance=>{
        client=clientInstance
        console.log("mongo db is connected")
         createCounter(client.db())
         createIndexes(client.db())
    })
    .catch(err=>{
        console.log(err);
    })
}

export const getClient=()=>{
    return client;
}

export const dbshare=()=>{
     
   return client.db();
   

}

const createCounter=async(db)=>{
     const existingCounter= await db.collection("counters").findOne({_id:"cartitemId"})

     if(!existingCounter){
       await db.collection("counters").insertOne({_id:'cartitemId',value:0})
     }
}

const createIndexes=async(db)=>{
    try{
    await db.collection("products").createIndex({price:1})
    await db.collection("products").createIndex({name:1,category:-1})
    await db.collection("products").createIndex({desc:"text"})
    }
    catch(err){
        console.log(err);
    }
    console.log('index is created')
}
