import { Server as SocketIOServer, Socket } from 'socket.io';
import config from '../utils/config';
import httpServer from './http';

const io = new SocketIOServer(httpServer, {
  cors: { origin: config.REQUEST_DOMAIN, credentials: true }
});

export default io;
