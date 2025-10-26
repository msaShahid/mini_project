import express from 'express';
import * as UserController from '@controllers/userController';
import { protect } from '@middlewares/authMiddleware';

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/profile', protect, UserController.getProfile);

export default router;
