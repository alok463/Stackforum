import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import responseHandler from '../helpers/helper.js';

dotenv.config()

export default (req,res,next) => {
     const token = req.header('x-auth-token');
     if(!token) {
         return res.status(401)
         .json(responseHandler(false, 401, 'Sign-In Required', null))
     }

     //token verification
     try {
         jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
               if(error) {
                   return res.status(400)
                   .json(responseHandler(false, 400, 'Try again', null))
               } else {
                   req.user = decoded.user;
               }
         })
         
     } catch (error) {
          console.error('error', + err);
          return res.status(500)
          .json(responseHandler(false, 500, 'server error', null))
     }
     

}