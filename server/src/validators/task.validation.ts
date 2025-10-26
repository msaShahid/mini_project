import mongoose from 'mongoose';
import { z } from 'zod';

// Task validation schema
export const taskSchema = z.object({
    userId: z
    .string()
    .nonempty('User ID is required')
    .transform((val) => new mongoose.Types.ObjectId(val)),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['Pending', 'InProgress', 'Hold', 'Done']),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}).refine((data) => ['Pending', 'InProgress', 'Hold', 'Done'].includes(data.status), {
  message: 'Invalid status value',
  path: ['status'], 
});

export type TaskInput = z.infer<typeof taskSchema>;


