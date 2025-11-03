import express from 'express';
import userController from '../controller/user.controller.js';

const router = express.Router();

router.get('/', userController.list);
router.get('/:id', userController.getUser);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router