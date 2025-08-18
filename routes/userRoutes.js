import express from 'express';
const router = express.Router();

// const {loginUser, signupUser} = require('../controllers/userController.js');

import {signupUser, loginUser, progress, bookmarks, update_bookmarks, update_progress, remove_progress} from '../controllers/UserController.js';

//signup route
router.post('/signup', signupUser); 
router.post('/login', loginUser);
router.get('/progress', progress);
router.get('/update_progress', update_progress);
router.get('/remove_progress', remove_progress);
router.get('/bookmarks', bookmarks);
router.get('/update_bookmarks', update_bookmarks);

// module.exports = router
export default router;