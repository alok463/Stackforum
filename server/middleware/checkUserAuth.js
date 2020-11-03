import jwt from 'jsonwebtoken';
import responseHandler from '../utils/responseHandler.js';
import dotenv from 'dotenv';

dotenv.config();

export default  (req,res,next) => {
        const token = req.header('x-auth-token');
        //check if the token exists
        if(!token) {
             return res.status(401)
             .json(responseHandler(false,  401 , 'Sign-In required', null))
        }
        //verify the token
        try {
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                     if(error) {
                         return res.status(400).json(responseHandler(false, 400, 'Try again', null ));
                     } else {
                         req.user = decoded.user;
                         next();
                     }
            })
            
        } catch (error) {
            console.log(`error`, error);
            return res.status(500).json(responseHandler(false, 500, 'Server error', null ))
            
        }
};