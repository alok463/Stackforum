import express from 'express';
import {check} from  'express-validator';
import CheckUserExistence from '../middleware/CheckUserExistence.js';
import {auth_register} from '../controllers/users.js';



const router = express.Router();


router.post('/', [
    check('username', 'Please include a valid username').isLength({min:5}),
    check('password', 'Please enter a valid password with 5 or more characters')
    .isLength({min:5}), CheckUserExistence], auth_register);

export default router;