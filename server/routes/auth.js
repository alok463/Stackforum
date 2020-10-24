import express from 'express';

 import auth from '../middleware/auth.js';
 import {check} from 'express-validator';
 import  {auth_login} from '../controllers/auth.js'


 const router = express();


 router.post('/', [
     check('username', 'Please include a valid username').isLength({min:5}),
     check('password', 'Password is required').not().isEmpty()
 ], auth_login)


 export default router;

 