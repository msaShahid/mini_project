import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import taskService from '@services/taskService';
import { taskSchema, TaskInput } from '@validators/task.validation';
import { formatZodErrors } from '@utils/validation';
import { AppError } from '@utils/AppError';
import { asyncHandler } from '@utils/asyncHandler';


export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId!;
    const { data, metaData } = await taskService.getTasks(userId, req.query);

    res.status(200).json({
      success: true,
      message: 'Tasks fetched successfully',
      data,
      metaData,
    });
  } catch (err) {
    next(err);
  }
};


export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = taskSchema.safeParse({ ...req.body, userId: req.userId });

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formatZodErrors(parsed.error),
      });
    }

    const task = await taskService.createTask(req.userId!, parsed.data);
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (err) {
    next(err);
  }
};


export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = taskSchema.partial().safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formatZodErrors(parsed.error),
      });
    }

    const task = await taskService.updateTask(req.params.id, parsed.data);
    if (!task) throw new AppError('Task not found', 404);
    
    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {

  const task = await taskService.deleteTask(req.params.id, req.userId!);

  if (!task) throw new AppError('Task not found', 404);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
  });
  
});
