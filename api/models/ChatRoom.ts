import mongoose from 'mongoose';
import User from './User';

const messageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // items: 1,
    // required: true
  },
  source: {
    type: String,
    description: 'Path for a message media'
  },
  message: {
    type: String,
    minLength: 1,
    maxLength: 512
  },
  reactions: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      items: 1,
      // required: true
    },
    type: {
      enum: ['love', 'like', 'dislike', 'laugh', 'suprise', 'sad'],
      // items: 1,
      // required: true
    }
  }],
  created: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: Date
  }
});

messageSchema.path('source').validate(
  function (val:string):boolean {
    return Boolean((!this.message && val) || (this.message && !val))
  },
  'Source is required and allowed only when message is not set!'
);

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 1,
    maxLength: 50,
    required: true
  },
  avatar: {
    type: String,
    minLength: 3,
    maxLength: 128
  },
  members: {
    type: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
      },
      nickname: {
        type: String,
        minLength: 1,
        maxLength: 50,
        // required: true
      }
    }],
    minItems: 2,
    required: true
  },
  messages: [messageSchema],
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('ChatRoom', roomSchema);
