import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import fs from 'fs-extra';
import log from '../utils/log';
import User from '../models/User';
import validate from '../validate/updateUsername';
const router = Router();

router.put('/', async (req:RequestSession, res:Response) => {
  try {
    const { userId } = req.session;

    const { error } = validate(req.body);

    if (error)
      return res.status(400).json({ msg: error.details[0].message });

    if (await User.exists({ username: req.body.username }))
      return res.status(400).json({ msg: 'Username is already taken!' });

    const user = await User.findOne({ _id: userId }).select('username avatar');

    const path = `./media/users/${user.username}`;

    if (fs.existsSync(path)) {
      fs.copySync(path, `./media/users/${req.body.username}`);
      fs.removeSync(path, { recursive: true, force: true });
    }

    await User.findOneAndUpdate({ _id: userId }, {
      username: req.body.username,
    });

    return res.json({ msg: 'Username successfully updated!' });
  } catch (ex) {
    log.error({ label: 'Update Username', message: ex });
    return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
});

export default router;
