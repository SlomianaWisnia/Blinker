import Router, { Request, Response } from 'express';
const router = Router();

router.post('/', async (req:Request, res:Response) => {
  return res.json({ msg: 'Logged in!' });
});

export default router;
