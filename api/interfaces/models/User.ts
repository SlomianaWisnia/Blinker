import mongoose, { Document } from 'mongoose';

export default interface User extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  about?: {
    emoji: string;
    bio: string;
  };
  avatar?: string;
  avatarHex: string;
  password: string;
  friends?: mongoose.Schema.Types.ObjectId[];
};
