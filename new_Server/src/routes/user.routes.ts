import express from 'express';
import userController from '../controller/user.controller.js';
import { upload } from '../middleware/uploadSingle.js';
import authProtected from '../middleware/auth.middlewear.js'

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/', authProtected, userController.list);
router.get('/:id', userController.getUser);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.post('/upload-profile',upload.single('profileImage'),userController.uploadProfileImage);

export default router