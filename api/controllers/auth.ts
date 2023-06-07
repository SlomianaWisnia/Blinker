import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import User from '../models/User';
import validate from '../validate/auth';
const router = Router();

router.post('/', async (req:RequestSession, res:Response) => {
  const { error } = validate(req.body);

  if (error)
    return res.status(400).json({ msg: 'Invalid username or password!' });

  if (!await User.exists({ 
    $or: [{ username: req.body.username }, { email: req.body.username }],
    password: req.body.password
  }))
    return res.status(400).json({ msg: 'Invalid username or password!' });

  const result = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.username }],
    password: req.body.password }).select('_id');

  req.session.userId = `${result._id}`;
  req.session.save();

  return res.json({ msg: 'Sucessfully logged in!' });
});

export default router;
