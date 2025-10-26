import User from '@models/User';
import { IUser } from '../types/user.types';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

const createUser = async (data: CreateUserInput): Promise<IUser> => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const user = await User.create(data);
  return user;
};

const findByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email });
};

const findById = async (id: string): Promise<IUser | null> => {
  return User.findById(id).select('-password');
};

export default { createUser, findByEmail, findById };
