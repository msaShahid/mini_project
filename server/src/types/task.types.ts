import mongoose from "mongoose";

export interface ITask {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  status: 'Pending' | 'InProgress' | 'Hold' | 'Done';
  createdAt?: Date;
  updatedAt?: Date;
}