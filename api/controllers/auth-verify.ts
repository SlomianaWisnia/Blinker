import Router, { Response } from 'express';
import log from '../utils/log';
const router = Router();

router.post('/', async (_req, res:Response) => {
  try {
    return res.json({ msg: 'Session verification sucessful!' });
  } catch (ex) {
    log.error({ label: 'Auth Verify', message: ex });
    return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
});

export default router;
