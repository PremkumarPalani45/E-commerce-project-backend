import jwt from 'jsonwebtoken'

export const jwtmiddleware=(req,res,next)=>{
    // console.log(req.headers);
    // read the token
    const token=req.headers['authorization']
    // if no token. return error
    if(!token){
        return res.status(401).send('unauthorized error')
    }
    // 3. check the token is valid or not
    try{
    const payload= jwt.verify(token,'2dk2SHquPZp5PVMPOIw73jRvtonZ1nbp')
      console.log(payload);
    req.userID=payload.userid;
    console.log(req.userID);
     }
     catch(err){
        return res.status(401).send(err)

     }
    // 4. call the next middleware
next();
    // 5. return error

}