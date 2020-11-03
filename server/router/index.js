import express from 'express';
import userAuth from './user_authRoute.js';
import questions from './questions.js';
import answers from './answers.js'
import login from './login.js';
import tags from './tags.js'
import loadUsers from './loadUsers.js';
import comments from './comments.js'
const router = express.Router();

router.use('/user/questions', questions);
router.use('/user/register', userAuth);
router.use('/user/login', login);
router.use('/user/getUsers', loadUsers)
router.use('/user/questions/answers', answers)
router.use('/user/tags', tags)
router.use('/user/questions/comments', comments)

//router.use('/user/question/comments' comments)


export default router;