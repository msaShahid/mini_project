import mongoose, { Document, Schema, Model } from 'mongoose';
import { ITask } from 'types/task.types';

const taskSchema = new Schema<ITask>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ['Pending', 'InProgress', 'Hold', 'Done'],
      default: 'Pending',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

taskSchema.index({ userId: 1, status: 1 });

taskSchema.methods.isDone = function (): boolean {
  return this.status === 'Done';
};

const Task: Model<ITask> = mongoose.model<ITask>('Task', taskSchema);

export default Task;
