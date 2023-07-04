import User from '../interfaces/models/User';
import mongoose from 'mongoose';

const schema = new mongoose.Schema<User>({
  username: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 70,
    required: true
  },
  avatar: {
    type: String,
    minlength: 5,
    maxlength: 128
  },
  avatarHex: {
    type: String,
    length: 7,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true
  },
  friends: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }]
});

export default mongoose.model('User', schema);
