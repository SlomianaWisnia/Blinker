import mongoose from 'mongoose';
import Message from '../interfaces/models/Message';
import ChatRoom from '../interfaces/models/ChatRoom';

const messageSchema = new mongoose.Schema<Message>({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  source: {
    type: String,
    minLength: 5,
    maxLength: 128,
    description: 'Path for a message media'
  },
  message: {
    type: String,
    minLength: 1,
    maxLength: 512,
    description: 'Text message without media'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
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

const roomSchema = new mongoose.Schema<ChatRoom>({
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  messages: [messageSchema]
});

export default mongoose.model('ChatRoom', roomSchema);
