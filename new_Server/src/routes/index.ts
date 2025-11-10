import express from 'express';
import userRouter from './user.routes.js';
import postUser from './post.routes.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/post',postUser);

export default router
