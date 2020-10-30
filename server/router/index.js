import express from 'express';
import userAuth from './user_authRoute.js';
import questions from './questions.js'
import login from './login.js'
const router = express.Router();

router.use('/user/question', questions);
router.use('/user/register', userAuth);
router.use('/user/login', login)


export default router;