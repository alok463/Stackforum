import express from 'express';
import {fetchUsers} from '../controllers/user_auth.js';


const router = express.Router();

router.get('/', fetchUsers);

router.get('/:id', fetchUsers)


export default router;