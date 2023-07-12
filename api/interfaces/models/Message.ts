import mongoose, { Document } from 'mongoose';
import User from './User';

export default interface Message extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  from: User['_id'];
  source?: string;
  message?: string;
  createdAt: Date;
  edited?: Date;
};
