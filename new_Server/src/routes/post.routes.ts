import express from 'express'
import postController from '../controller/post.controller.js'
import authMiddleware from '../middleware/auth.middlewear.js';

const router = express.Router();

router.get('/', postController.list);
router.get('/user', authMiddleware, postController.userPost);
router.get('/:id', authMiddleware, postController.getPostByid);
router.post('/', authMiddleware, postController.create);
router.put('/:id', authMiddleware, postController.update);
router.delete('/:id', authMiddleware, postController.delete);

export default router;