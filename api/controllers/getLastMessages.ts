import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import _ from 'lodash';
import log from '../utils/log';
import ChatRoom from '../models/ChatRoom';
import User from '../models/User';
const router = Router();

router.get('/', async (req:RequestSession, res:Response) => {
  try {
    const { userId } = req.session;
    const result = await ChatRoom.find({ 'members._id': userId }).lean().select('members messages');
    const user = await User.findOne({ _id: userId }).select('username avatar'); 
    const { username, avatar } = user;
    const messages:any = [];

    result.forEach((room:any) => {
      const lastItem = room.messages.pop();

      const { from } = lastItem;
      const { nickname } = room.members.find(member => member._id.equals(from));

      lastItem.from = {
        username,
        avatar,
        nickname
      };

      messages.push(lastItem);
    });

    return res.json({ messages });
  } catch (ex) {
    console.log(ex);
    return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
});

export default router;
