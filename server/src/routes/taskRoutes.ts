import express from 'express';
import { protect } from '@middlewares/authMiddleware';
import * as taskController from '@controllers/taskController';

const router = express.Router();

router.use(protect);

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
