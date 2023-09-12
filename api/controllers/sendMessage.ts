import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import errorHandle from '../utils/errorHandling/router';
import multer from 'multer';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import ChatRoom from '../models/ChatRoom';
import validate from '../validate/message';
import io from '../services/io';
import { encrypt } from '../utils/encrypt';
const router = Router();

router.put('/:id', async (req:RequestSession, res:Response) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ msg: 'Parameter id is not set!' });
    
    const { id } = req.params;
    
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ msg: 'Invalid Chat Room ID!' });

    const { userId } = req.session;

    if (!await ChatRoom.exists({ _id: id, members: userId }))
      return res.status(400).json({ msg: 'Invalid Chat Room ID!' });

    const storage = multer.diskStorage(
      {
        destination: `./media/chats/${id}`,
        filename: function (_req, file, cb) {
          cb(null, `${new Date().toISOString()}-${uuidv4()}.${file.originalname.split('.').pop()}`)
        }
      }
    );

    const fileFormats = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi', 'video/mov', 'audio/mp3', 'audio/ogg', 'audio/wave', 'application/pdf'];

    const fileLimit = 7 * 1024 * 1024; // 7MB

    const upload = multer({
      storage,
      limits: {
        fileSize: fileLimit
      },
      fileFilter: (req, file, cb) => {
        if (!fileFormats.includes(file.mimetype))
          return res.status(400).json({ msg: 'Unsupported file type!' });

        const fileSize = parseInt(req.headers['content-length']);
        
        if (fileSize > fileLimit)
          return res.status(400).json({ msg: 'We support only files up to 7MB!' });

        cb(null, true);
      }
    }).single('media');

    upload(req, res, async (err) => {
      if (req.file !== undefined) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ msg: err });
        } else if (err) {
          errorHandle('Send Message / Upload', res, `${err}`);
        }

        const messageBody = {
          from: userId,
          source: `${req.file.filename}`
        };

        const result = await ChatRoom.findOneAndUpdate({ _id: id }, {
          $push: { messages: messageBody }
        }, { new: true });

        const chatId = `${id}`;
        const messageId = `${result.messages.pop()._id}`;

        const { messages } = await ChatRoom.findOne({ _id: chatId, 'messages._id': messageId }).select('messages').slice('messages', -1).populate('messages.from', '-_id username about avatar avatarHex');
        io.to(`${id}`).emit('sendMessage', { chatId, message: messages[0] });

        return res.json({ msg: 'Message successfully sent!' });
      } else {
        const { error } = validate(req.body);

        if (error)
          return res.status(400).json({ msg: error.details[0].message });

        const { message } = req.body;

        const messageBody = {
          from: userId,
          message: await encrypt(message)
        };

        const result = await ChatRoom.findOneAndUpdate({ _id: id }, {
          $push: { messages: messageBody },
        }, { new: true });

        const chatId = `${id}`;
        const messageId = `${result.messages.pop()._id}`;

        const { messages } = await ChatRoom.findOne({ _id: chatId, 'messages._id': messageId }).select('messages').slice('messages', -1).populate('messages.from', '-_id username about avatar avatarHex');
        const decryptedContent = message;
        const decryptedMessage = decryptedContent ? {
          ...messages[0].toObject(),
          message: decryptedContent,
        } : { ...messages[0].toObject};
        io.to(`${id}`).emit('sendMessage', { chatId, message: decryptedMessage });

        return res.json({ msg: 'Message successfully sent!' });
      }
    });
  } catch (ex) {
    errorHandle('Send Message', res, `${ex}`);
  }
});

export default router;
