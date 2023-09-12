import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import User from '../models/User';
import errorHandle from '../utils/errorHandling/router';
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
    errorHandle('Auth Verify', res, `${ex}`);
  }
});

export default router;
