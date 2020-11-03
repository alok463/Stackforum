import express from 'express';
import {fetchAllTags} from '../controllers/tags.js'

const router = express.Router();

router.get('/', fetchAllTags)


export default router;