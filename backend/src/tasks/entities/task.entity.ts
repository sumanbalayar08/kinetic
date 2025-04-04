import { Schema, Document, Types } from 'mongoose';

export interface Task extends Document {
  title: string;
  description?: string;
  deadline: Date;
  user: Types.ObjectId;
}

export const TaskSchema = new Schema<Task>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  deadline: {
    required: true,
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
