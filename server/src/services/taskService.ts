import Task from '@models/Task';
import { ITask } from '../types/task.types'
import { paginateAndFilter } from '@utils/paginateAndFilter';

interface TaskQuery {
  status?: string;
  q?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const getTasks = async (userId: string, query: TaskQuery) => {
  const filter: Record<string, any> = {};

  if (query.status) {
    filter.status = query.status;
  }

  if (query.q) {
    filter.title = { $regex: query.q, $options: 'i' };
  }

  return paginateAndFilter<ITask>(Task, filter, query, {
    select: '-__v',
  });

};

const createTask = async (userId: string, data: Partial<ITask>): Promise<ITask> => {
  return Task.create({ ...data, userId });
};

const updateTask = async (id: string, data: Partial<ITask>): Promise<ITask | null> => {
  return Task.findOneAndUpdate({ _id: id }, data, { new: true });
};

const deleteTask = async (id: string, userId: string): Promise<ITask | null> => {
  return Task.findOneAndDelete({ _id: id, userId });
};

export default { getTasks, createTask, updateTask, deleteTask };
