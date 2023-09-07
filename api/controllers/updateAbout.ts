import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import log from '../utils/log';
import User from '../models/User';
import validate from '../validate/updateAbout';
const router = Router();

router.put('/', async (req:RequestSession, res:Response) => {
  try {
    const { userId } = req.session;

    const { error } = validate(req.body);

    if (error)
      return res.status(400).json({ msg: error.details[0].message });

    await User.findOneAndUpdate({ _id: userId }, {
      about: req.body.about,
    });

    return res.json({ msg: 'Bio susccessfully updated!' });
  } catch (ex) {
    log.error({ label: 'Update About', message: ex });
    return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
});

export default router;
