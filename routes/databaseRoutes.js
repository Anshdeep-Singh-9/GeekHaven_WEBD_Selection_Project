import express from 'express';
const router = express.Router();

import {populate, search, all} from '../controllers/DatabaseController.js';

router.post('/populateDatabase', populate);

router.get('/search', search)

router.get('/all', all);

export default router;