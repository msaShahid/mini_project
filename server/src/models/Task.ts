import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: 'Pending' | 'InProgress' | 'Hold' | 'Done';
  createdAt?: Date;
  updatedAt?: Date;
}

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
