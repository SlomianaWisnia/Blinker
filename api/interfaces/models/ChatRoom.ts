import { Document } from 'mongoose';
import User from './User';
import Message from './Message';

export default interface ChatRoom extends Document {
  _id: string;
  members: User['_id'][];
  messages: Message[];
};
