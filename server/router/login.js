import express from 'express';
import {check} from 'express-validator';
import {login} from '../controllers/user_auth.js';



const router = express.Router();

//load the user 



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


    export default router;