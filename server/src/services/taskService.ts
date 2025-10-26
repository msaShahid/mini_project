import Task from '@models/Task';
import {ITask} from '../types/task.types'

interface TaskQuery {
  status?: string;
  q?: string;
  page?: string;
  limit?: string;
}

const getTasks = async (userId: string, query: TaskQuery): Promise<ITask[]> => {
  const filter: Record<string, any> = { userId };

  if (query.status !== undefined) {
    filter.status = query.status === 'Pending';
  }

  if (query.q) {
    filter.title = { $regex: query.q, $options: 'i' };
  }

  const page = parseInt(query.page || '1');
  const limit = parseInt(query.limit || '10');
  const skip = (page - 1) * limit;

  return Task.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
};

const createTask = async (userId: string, data: Partial<ITask>): Promise<ITask> => {
  return Task.create({ ...data, userId });
};

const updateTask = async (id: string, data: Partial<ITask>, userId: string): Promise<ITask | null> => {
  return Task.findOneAndUpdate({ _id: id, userId }, data, { new: true });
};

const deleteTask = async (id: string, userId: string): Promise<ITask | null> => {
  return Task.findOneAndDelete({ _id: id, userId });
};

export default { getTasks, createTask, updateTask, deleteTask };
