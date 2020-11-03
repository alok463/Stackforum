import express from 'express';
import {check} from 'express-validator';
import {addAnswers,getAllAnswers,getAnswersById, deleteAnswers} from '../controllers/answers.js';
import checkUserAuth from '../middleware/checkUserAuth.js';
import checkUserAction from  '../middleware/checkUserAction.js';


const router = express.Router();

router.get('/', getAllAnswers)
router.get('/:id', getAnswersById)
router.delete('/:id', [checkUserAuth, checkUserAction], deleteAnswers)

router.post(
    '/:id',
    [
        checkUserAuth,
        [
            check('body','body is required')
                .not()
                .isEmpty()
        ]
    ], addAnswers);



export default router;