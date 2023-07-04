import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import log from '../utils/log';
import ChatRoom from '../models/ChatRoom';
const router = Router();

router.get('/', async (req:RequestSession, res:Response) => {
  try {
    const { userId } = req.session;
    const result = await ChatRoom.find({ members: userId }).select('members messages').slice('messages', -1).populate('members messages.from', '-_id username avatar avatarHex');
    return res.json({ chats: [...result] });
  } catch (ex) {
    log.error({ label: 'Get Last Messages', message: ex });
    return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
});

export default router;
