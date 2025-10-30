import mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  comparePassword(candidate: string): Promise<boolean>;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}