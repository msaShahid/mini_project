import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import taskService from '@services/taskService';
import { taskSchema, TaskInput } from '@validators/task.validation';
import { formatZodErrors } from '@utils/validation';


export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await taskService.getTasks(req.userId!, req.query);
    res.status(200).json({
      success: true,
      message: 'Tasks fetched successfully',
      data: tasks,
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

    const task = await taskService.updateTask(req.params.id, parsed.data, req.userId!);
    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await taskService.deleteTask(req.params.id, req.userId!);
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
