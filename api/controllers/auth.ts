import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import log from '../utils/log';
import validate from '../validate/auth';
const router = Router();

router.post('/', async (req:RequestSession, res:Response) => {
  try {
    const { error } = validate(req.body);

    if (error)
      return res.status(400).json({ msg: 'Invalid username or password!' });

    if (!await User.exists({ 
      $or: [{ username: req.body.username }, { email: req.body.username }]
    }))
      return res.status(400).json({ msg: 'Invalid username or password!' });

    const result = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.username }] }).select('_id password');

    if (!await bcrypt.compare(req.body.password, result.password))
      return res.status(400).json({ msg: 'Invalid username or password!' });

    req.session.userId = `${result._id}`;
    req.session.save(err => {
      if (err) {
        log.error({ label: 'Auth Controller / Saving session', message: err });
        return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
      }
    });

    return res.json({ msg: 'Sucessfully logged in!' });
  } catch (ex) {
    log.error({ label: 'Auth Controller', message: ex });
    return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
});

export default router;
