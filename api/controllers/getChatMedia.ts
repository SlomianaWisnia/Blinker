import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs-extra';
import errorHandle from '../utils/errorHandling/router';
import ChatRoom from '../models/ChatRoom';
import { decrypt } from '../utils/encrypt';

const router = Router();

router.get('/:id/:source', async (req: RequestSession, res: Response) => {
  try {
    const { userId } = req.session;
    const { id, source } = req.params;

    if (!id)
      return res.status(400).json({ msg: 'ChatRoom ID is not provided!' });

    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ msg: 'Invalid Chat Room ID!' });
    
    if (!source)
      return res.status(400).json({ msg: 'Source is not provided!' });

    const chatRooms = await ChatRoom.exists({ _id: id, members: userId, 'messages.source': source });

    if (!chatRooms) {
      return res.status(404).json({ msg: 'File not found!' });
    }

    if (!fs.existsSync(__dirname + `/../media/chats/${id}/${source}`)) {
      return res.status(404).json({ msg: 'File not found!' });
    }

    return res.sendFile(path.resolve(__dirname + `/../media/chats/${id}/${source}`));
  } catch (ex) {
    errorHandle('Get Chat Media', res, `${ex}`);
  }
});

export default router;
