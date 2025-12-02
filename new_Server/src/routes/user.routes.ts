import express from 'express';
import userController from '../controller/user.controller.js';
import { upload } from '../middleware/uploadSingle.js';
import authProtected from '../middleware/auth.middlewear.js'
import {registerSchema} from '../validations/user.validation.js'
import {validate} from  '../middleware/validate.js'

const router = express.Router();

router.post('/register', validate(registerSchema), userController.register);
router.post('/login', userController.login);

router.get('/', userController.list);
router.get('/:id', userController.getUser);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.post('/upload-profile',upload.single('profileImage'),userController.uploadProfileImage);

export default router