import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import log from '../utils/log';
import ChatRoom from '../models/ChatRoom';
import ChatRoomInterface from '../interfaces/models/ChatRoom';
import Message from '../interfaces/models/Message';
import { decrypt } from '../services/encrypt';
const router = Router();

router.get('/', async (req:RequestSession, res:Response) => {
  try {
    const { userId } = req.session;
    const result = await ChatRoom.find({ members: userId }).select('members messages').slice('messages', -1).populate('members messages.from', '-_id username avatar avatarHex');
    const decryptedResult = result.map((room:ChatRoomInterface) => {
      const decryptedMessages = room.messages.map((message:Message) => {
        const decryptedContent = message.message ? decrypt(message.message) : '';
        return decryptedContent
          ? {
              ...message.toObject(),
              message: decryptedContent,
            }
          : { ...message.toObject() };
      });
      return {
        ...room.toObject(),
        messages: decryptedMessages,
      };
    });

    return res.json({ chats: decryptedResult });
  } catch (ex) {
    log.error({ label: 'Get Last Messages', message: ex });
    return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
});

export default router;
