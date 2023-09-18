import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import errorHandle from '../utils/errorHandling/router';
import User from '../models/User';
import validate from '../validate/listUser';
const router = Router();

router.get('/', async (req:RequestSession, res:Response) => {
  try {
    const { error } = validate(req.body);

    if (error)
      return res.status(400).json({ msg: error.details[0].message });

    const users = await User.find({ 'username': { '$regex': req.body.phrase, '$options': 'i' } }).lean().select('-_id username email about avatar avatarHex').populate('friends', '-_id username about avatar avatarHex');

    return res.json({ users });
  } catch (ex) {
    errorHandle('List Users', res, `${ex}`);
  }
});

export default router;
