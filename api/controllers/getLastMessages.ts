import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import errorHandle from '../utils/errorHandling/router';
import ChatRoom from '../models/ChatRoom';
import { decrypt } from '../utils/encrypt';

const router = Router();

router.get('/', async (req: RequestSession, res: Response) => {
  try {
    const { userId } = req.session;

    const chatRooms = await ChatRoom.find({ members: userId })
      .select('members messages')
      .populate('members messages.from', '-_id username about avatar avatarHex');

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
    errorHandle('Get Last Messages', res, `${ex}`);
  }
});

export default router;
