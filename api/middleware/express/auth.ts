import User from '../../models/User';
import RequestSession from '../../interfaces/RequestSession';
import { Response, NextFunction } from 'express';
import log from '../../utils/log';

export default async function (req:RequestSession, res:Response, next:NextFunction) {
  try {
    if (!req.session) {
      return res.status(401).json({ msg: 'Access denied! Please, log in!' });
    }

    if (!req.session.userId) {
      return res.status(401).json({ msg: 'Access denied! Please, log in!' });
    }
   
    const { userId } = req.session;

    if (!await User.exists({ _id: userId }))
      return res.status(400).json({ msg: 'Invalid token!' });

    next();
  } catch (ex) {
      log.error({ label: 'Auth Middleware', message: ex });
      return res.status(500).json({ msg: 'Something went wrong! Please, try again later.' });
  }
};