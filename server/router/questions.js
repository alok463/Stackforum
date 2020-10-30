import express from 'express';
import {check} from 'express-validator';
import {addQuestion} from '../controllers/question.js';
import checkUserAuth from '../middleware/checkUserAuth.js';

const router = express.Router();
router.post(
    '/',
    [
        checkUserAuth,
        [
            check('question', 'Enter a title with minimum 15 characters').isLength({min:15}),
            check('body','Enter a body with minimum 30 characters').isLength({min:30})
        ],
    ], addQuestion);


export default router;