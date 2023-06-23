import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import log from '../utils/log';
const router = Router();

router.post('/', async (req:RequestSession, res:Response) => {
  try {
    if (!req.session.userId)
      return res.status(400).json({ msg: 'You are not logged in!' });
    
    req.session.destroy();
    return res.json({ msg: 'Sucessfully logged out!' });
  } catch (ex) {
    log.error({ label: 'Log Out Controller', message: ex });
    return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
});

export default router;
