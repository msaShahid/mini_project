import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userService from '@services/userService';
import { registerSchema, loginSchema, RegisterInput, LoginInput } from '@validators/user.validation';
import mongoose from 'mongoose';
import { formatZodErrors } from '@utils/validation';

// Generate JWT token
const generateToken = (id: string | mongoose.Types.ObjectId): string => {
  return jwt.sign({ id: id.toString() }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

// Register a new user
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

// Login user
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
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
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

// Get user profile
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.findById(req.userId!);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User profile retrieved',
      data: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err: any) {
    next(err);
  }
};
