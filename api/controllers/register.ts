import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import validate from '../validate/register';
import randomHexColor from '../utils/randomHexColor';
import errorHandle from '../utils/errorHandling/router';
const router = Router();

router.post('/', async (req:RequestSession, res:Response) => {
  try {
    const { error } = validate(req.body);

    if (error)
      return res.status(400).json({ msg: error.details[0].message });

    if (await User.exists({ username: req.body.username }))
      return res.status(400).json({ msg: 'This username is already taken!' });
    
    if (await User.exists({ email: req.body.email }))
      return res.status(400).json({ msg: 'This email is already taken!' });

    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = new User({ 
      username: req.body.username,
      email: req.body.email,
      avatarHex: randomHexColor(),
      password: hash
    });
    const result = await user.save();

    req.session.userId = `${result._id}`;
    req.session.save();

    return res.json({ msg: 'Sucessfully registered!' });
  } catch (ex) {
    errorHandle('Register', res, `${ex}`);
  }
});

export default router;
