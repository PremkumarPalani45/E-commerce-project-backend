import exp from 'constants';
import { sign } from 'crypto';
import fs from 'fs'
import { transferableAbortController } from 'util';
import winston from 'winston'

const fsPromises=fs.promises;

// async function log(logdata){
//     try{
//         logdata= `\n ${new Date().toString() } - ${logdata}`;
       
//       await  fsPromises.appendFile("log.text",logdata)
//     }
//     catch(err){

//     }
// }

const loggerwi=winston.createLogger({
   level:'info',
   format:winston.format.json(),
   defaultMeta: {service:'request-logging'},
   transports:[
    new winston.transports.File({filename:'log.txt'})
   ]
})





const loggermiddleware =(req,res,next)=>{
    //1. log request body
    if(!req.url.includes('signin')){
        const logger=`${req.url} - ${JSON.stringify(req.body) }`
       loggerwi.info(logger);
    }
   
   next();
}

export default loggermiddleware;