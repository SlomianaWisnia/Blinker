import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
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
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  messages: [messageSchema],
  created: {
    type: Date,
    default: Date.now,
    required: true
  }
});

export default mongoose.model('ChatRoom', roomSchema);
