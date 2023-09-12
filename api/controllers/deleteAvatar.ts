import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import fs from 'fs-extra';
import errorHandle from '../utils/errorHandling/router';
import User from '../models/User';
const router = Router();

router.delete('/', async (req:RequestSession, res:Response) => {
  try {
    const { userId } = req.session;

    const user = await User.findOneAndUpdate({ _id: userId }, {
      avatar: '',
    });

    if (user.avatar) {
      const path = `./media/users/${user.username}/avatar`;
      fs.rmSync(path, { recursive: true, force: true });
      return res.json({ msg: 'Your avatar has been successfully removed!' });
    }

    return res.status(400).json({ msg: `You don't have any avatar set!` });
  } catch (ex) {
    errorHandle('Delete Avatar', res, `${ex}`);
  }
});

export default router;
