import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userService from '@services/userService';
import { registerSchema, loginSchema, RegisterInput, LoginInput } from '@validators/user.validation';
import mongoose from 'mongoose';
import { formatZodErrors } from '@utils/validation';
import { AppError } from '@utils/AppError';


const generateToken = (id: string | mongoose.Types.ObjectId): string => {
  return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};


export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const userId = req.userId!;
    const { data, metaData } = await userService.getAllUser(userId, req.query);
    
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data,
      metaData, 
    });

  }catch(err){
    next(err);
  }
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formatZodErrors(parsed.error),
      });
    }

    const { name, email, password }: RegisterInput = parsed.data;

    const user = await userService.createUser({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { _id: user._id, name: user.name, email: user.email, token },
    });
  } catch (err: any) {
    next(err);
  }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formatZodErrors(parsed.error),
      });
    }

    const { email, password }: LoginInput = parsed.data;

    const user = await userService.findByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: { _id: user._id, name: user.name, email: user.email, token },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.findById(req.userId!);

    if (!user) throw new AppError('User not found', 404);

    res.status(200).json({
      success: true,
      message: 'User profile retrieved',
      data: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err: any) {
    next(err);
  }
};
