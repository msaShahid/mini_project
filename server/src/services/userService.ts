import User from '@models/User';
import { CreateUserInput, IUser } from '../types/user.types';
import { paginateAndFilter } from '@utils/paginateAndFilter';

interface TaskQuery {
  status?: string;
  q?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const getAllUser = async (userId: string, query: TaskQuery) => {
  const filter: Record<string, any> = {};

  if (query.status) {
    filter.status = query.status;
  }

  if (query.q) {
    filter.$or = [
      { name: { $regex: query.q, $options: 'i' } },
      { email: { $regex: query.q, $options: 'i' } },
    ];
  }

  return paginateAndFilter<IUser>(User, filter, query, {
    select: '-__v -password',
  });
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

export default { getAllUser, createUser, findByEmail, findById };
