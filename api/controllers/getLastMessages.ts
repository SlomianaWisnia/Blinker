import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import log from '../utils/log';
import ChatRoom from '../models/ChatRoom';
import { decrypt } from '../services/encrypt';
const router = Router();

router.get('/', async (req:RequestSession, res:Response) => {
  try {
    const { userId } = req.session;
    const result = await ChatRoom.find({ members: userId }).select('members messages').slice('messages', -1).populate('members messages.from', '-_id username avatar avatarHex');
    const decryptedResult = result.map((room) => {
    const decryptedMessages = room.messages.map((message) => {
      const decryptedContent = message.message ? decrypt(message.message) : '';
        return {
          ...message.toObject(),
          message: decryptedContent,
        };
      });
      return {
        chats: {
          ...room.toObject(),
          messages: decryptedMessages,
        }
      };
    });

    return res.json({ chats: decryptedResult });
  } catch (ex) {
    log.error({ label: 'Get Last Messages', message: ex });
    return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
});

export default router;
