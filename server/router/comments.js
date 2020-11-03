import express from 'express';
import {check} from 'express-validator';
import {  getAllComments,
    addComments,
    removeComments} from '../controllers/comments.js';
import checkUserAuth from '../middleware/checkUserAuth.js';
import checkUserAction from  '../middleware/checkUserAction.js';

const router = express.Router();

router.get('/:id', getAllComments);



router.post(
    '/:id',
    [
        checkUserAuth,
        [
            check('body','body is required')
                .not()
                .isEmpty()
        ]
    ], addComments);



router.delete('/:id', [checkUserAuth, checkUserAction], removeComments)



export default router;