import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import errorHandle from '../utils/errorHandling/router';
import User from '../models/User';
import ChatRoom from '../models/ChatRoom';
import validate from '../validate/updateUsername';
const router = Router();

router.post('/', async (req:RequestSession, res:Response) => {
  try {
    const { userId } = req.session;

    const { error } = validate(req.body);

    if (error)
      return res.status(400).json({ msg: error.details[0].message });

    const user = await User.findOne({ _id: userId }).select('friends');
    const { friends } = user;

    if (!await User.exists({ username: req.body.username })) {
      return res.status(400).json({ msg: 'Friend ID is invalid!' });
    }

    const friend = await User.findOne({ username: req.body.username }).select('_id');

    if (friends.includes(friend._id)) {
      return res.status(400).json({ msg: `${req.body.username} is already your friend!` });
    }

    await User.findOneAndUpdate({ _id: userId }, {
      $push: { friends: friend._id }
    });

    if (!await ChatRoom.exists({ members: { $in: [userId, friend._id] }})) {
      const chatroom = new ChatRoom({ members: [userId, friend._id] });
      await chatroom.save();
    }

    return res.json({ msg: `Successfully added ${req.body.username} to your friend list!` });
  } catch (ex) {
    errorHandle('Add Friend', res, `${ex}`);
  }
});

export default router;
