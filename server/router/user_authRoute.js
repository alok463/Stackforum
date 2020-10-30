import express from 'express';
import {check} from 'express-validator';
import {login, register, loadTheUser} from '../controllers/user_auth.js';
import  userExistence from '../middleware/UserExistence.js';
import checkUserAuth from '../middleware/checkUserAuth.js';

const router = express.Router();

//load the user 

router.get('/',  checkUserAuth, loadTheUser);

//login route
router.post(
    '/',
    [
        check('username', 'Please include a valid username').isLength({min:5}),
        check(
            'password',
            'Password is required'
        ).not().isEmpty()
    ], login)


//register the user in the database
router.post(
    '/',
    [
        check('username', 'Please include a valid username').isLength({ min: 6 }),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }), userExistence
    ], register);




export default router;