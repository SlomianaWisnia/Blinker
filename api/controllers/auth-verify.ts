import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import User from '../models/User';
import log from '../utils/log';
const router = Router();

router.post('/', async (req:RequestSession, res:Response) => {
  try {
    const { userId } = req.session;
    const user = await User.findOne({ _id: userId }).lean().select('-_id username email about avatar avatarHex').populate('friends', '-_id username about avatar avatarHex');

    const { friends } = user;
    delete user.friends;

    return res.json({
      msg: 'Session verification sucessful!',
      data: { user, friends }
    });
  } catch (ex) {
    log.error({ label: 'Auth Verify', message: ex });
    return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
});

export default router;
