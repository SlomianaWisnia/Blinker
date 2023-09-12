import RequestSession from '../interfaces/RequestSession';
import Router, { Response } from 'express';
import errorHandle from '../utils/errorHandling/router';
const router = Router();

router.post('/', async (req:RequestSession, res:Response) => {
  try {
    if (!req.session.userId)
      return res.status(400).json({ msg: 'You are not logged in!' });
    
    req.session.destroy();
    return res.json({ msg: 'Sucessfully logged out!' });
  } catch (ex) {
    errorHandle('Log Out', res, `${ex}`);
  }
});

export default router;
