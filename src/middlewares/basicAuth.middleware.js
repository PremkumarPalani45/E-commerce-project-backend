import userModel from "../features/user/user.Model.js";

export const basicAuthrizer=(req,res,next)=>{

 //1. check if auth header is empty
    const authHeader=req.headers['authorization'];

    if(!authHeader){
       return res.status('401').send('No authorization details found')
    }
   
    // 2. extract the credentials.[basic diwjdoqwjdfoqwjfd;oa;of]
   //  console.log(authHeader)
    const base64Credentials=authHeader.replace('Basic ','')
   //   console.log(base64Credentials)
    // 3. decode credentials
     const decodeCredentials= Buffer.from(base64Credentials,'base64').toString('utf8')

   //   console.log(decodeCredentials)

     const creds=decodeCredentials.split(':');

     console.log(creds)
     const user=userModel.getAll().find(u=>u.email==creds[0]&& u.password==creds[1])

     if(user){
        next();
     }
     else{
        return res.status(401).send('invalid credentials')
     }
}


