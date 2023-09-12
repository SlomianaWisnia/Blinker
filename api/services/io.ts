import { Server as SocketIOServer, Socket } from 'socket.io';
import httpServer from './http';

const io = new SocketIOServer(httpServer, {
  cors: { origin: process.env.REQUEST_DOMAIN, credentials: true }
});

export default io;
