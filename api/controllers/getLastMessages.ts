import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import log from '../utils/log';
import ChatRoom from '../models/ChatRoom';
import { decrypt } from '../utils/encrypt';

const router = Router();

router.get('/', async (req: RequestSession, res: Response) => {
  try {
    const { userId } = req.session;

    const chatRooms = await ChatRoom.find({ members: userId })
      .select('members messages')
      .populate('members messages.from', '-_id username avatar avatarHex');

    if (!chatRooms || chatRooms.length === 0) {
      return res.json({ chats: [] });
    }

    const decryptedChatRooms = [];

    for (const room of chatRooms) {
      if (room.messages.length) {
        const lastMessage = room.messages[room.messages.length - 1];

        if (lastMessage && typeof lastMessage.message === 'string') {
          const decrypted = await decrypt(lastMessage.message);
          lastMessage.message = decrypted;
        }

        decryptedChatRooms.push({
          ...room.toObject(),
          messages: [lastMessage],
        });
      } else {
        decryptedChatRooms.push({
          ...room.toObject(),
        });
      }
    }

    return res.json({ chats: decryptedChatRooms });
  } catch (ex) {
    log.error({ label: 'Get Last Messages', message: ex });
    return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
});

export default router;
