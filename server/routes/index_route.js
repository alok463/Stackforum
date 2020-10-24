import express from 'express';
import login from './auth.js';
import register from './users.js';


const router = express.Router();

router.use('/login', login);
router.use('/register', register)


export default router;