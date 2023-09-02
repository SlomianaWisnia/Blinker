import User from '../../models/User';
import { Socket } from 'socket.io';
import log from '../../utils/log';

type AuthenticatedSocket = Socket & { request: { session: { userId?: string } } };

export default async function (socket: AuthenticatedSocket, next: () => void) {
  try {
    if (!socket.request.session || !socket.request.session.userId)
      return socket.emit('session_err', { msg: 'Access denied! Please, log in!' });
   
    const { userId } = socket.request.session;

    if (!await User.exists({ _id: userId }))
      return socket.emit('session_err', { msg: 'Invalid token!' });

    next();
  } catch (ex) {
    log.error({ label: 'Socket Auth Middleware', message: ex });
    return socket.emit('session_err', { msg: 'Something went wrong during authentication!' });
  }
};
