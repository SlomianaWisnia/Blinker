import { Schema } from 'mongoose';
import { Socket } from 'socket.io';
import helmet from 'helmet';

import io from '../../services/io';
import ChatRoom from '../../models/ChatRoom';
import sessionMiddleware from '../express/session';
import authorizationSocket from './auth';

io.use(function (socket:Socket & { request: { res: object } }, next: () => void) {
  sessionMiddleware(socket.request, socket.request.res, next);
});

io.use(authorizationSocket);

io.engine.use(helmet({
  crossOriginResourcePolicy: false,
}));

io.on('connection', async (socket:Socket & { request: { session: { userId: string } } }) => {
  const chatrooms = await ChatRoom.find({ members: socket.request.session.userId }).select('_id');
  chatrooms.forEach((room:{ _id: Schema.Types.ObjectId }) => {
    socket.join(`${room._id}`);
  });
});
