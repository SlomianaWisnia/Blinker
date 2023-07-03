import mongoose, { Document } from 'mongoose';
import User from './User';
import Message from './Message';

export default interface ChatRoom extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  members: User['_id'][];
  messages: Message[];
};
