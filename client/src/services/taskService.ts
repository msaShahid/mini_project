import { AuthApi } from '../api/axiosClient';
import { endpoints } from '../api/endpoints';
import { ApiResponse } from '../types/ApiResponse';
import type { Task } from '../types/Task';
import { handleApiError } from '../utils/apiHandler';

export const taskService = {

  async getAll(): Promise<Task[]> {
    try {
      const response = await AuthApi.get<ApiResponse<Task[]>>(endpoints.tasks.root);
      return response.data.data || [];
    } catch (error) {
      handleApiError(error);
    }
  },

  async create(task: Partial<Task>): Promise<Task> {
    try {
      const response = await AuthApi.post<Task>(endpoints.tasks.root, task);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async update(id: string, data: Partial<Task>): Promise<Task> {
    try {
      const response = await AuthApi.put<Task>(endpoints.tasks.byId(id), data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async remove(id: string): Promise<void> {
    try {
      await AuthApi.delete(endpoints.tasks.byId(id));
    } catch (error) {
      handleApiError(error);
    }
  },
};
