import express from 'express';
import { Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import MongoDBStore from 'connect-mongo';
import { Schema } from 'mongoose';
import authorizationSocket from './middleware/socket/auth';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import './services/db';
import swaggerUI from 'swagger-ui-express';
import specs from './docs/rest/index';
import auth from './routes/auth';
import authorization from './middleware/express/auth';
import register from './routes/register';
import getLastMessages from './routes/getLastMessages';
import getChatMessages from './routes/getChatMessages';
import sendMessage from './routes/sendMessage';
import authVerify from './routes/auth-verify';
import logOut from './routes/logOut';
import log from './utils/log';

import ChatRoom from './models/ChatRoom';

dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });

const app = express();
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: { origin: process.env.REQUEST_DOMAIN, credentials: true }
});

app.use(express.json());

const corsOptions = {
  origin: process.env.REQUEST_DOMAIN,
  credentials: true,
  optionSuccessStatus: 200
};

const store = MongoDBStore.create({
  mongoUrl: `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
  collectionName: 'sessions',
  autoRemove: 'interval',
  stringify: false,
  ttl: 3 * 60 * 60 //3H
});


const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store,
  cookie: {
      maxAge: 3 * 60 * 60 * 1000, //3H
      httpOnly: true,
  },
});

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(sessionMiddleware);

app.use(helmet());

io.use(function (socket:Socket & { request: { res: object } }, next: () => void) {
  sessionMiddleware(socket.request, socket.request.res, next);
});

io.use(authorizationSocket);

io.engine.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use('/docs/rest', swaggerUI.serve, swaggerUI.setup(specs));
}
app.use('/api/auth', auth);
app.use('/api/register', register);
app.use('/api/get-last-messages', [authorization, getLastMessages]);
app.use('/api/messages', [authorization, getChatMessages]);
app.use('/api/send-message', [authorization, sendMessage]);
app.use('/api/auth-verify', [authorization, authVerify]);
app.use('/api/logout', logOut);

io.on('connection', async (socket:Socket & { request: { session: { userId: string } } }) => {
  const chatrooms = await ChatRoom.find({ members: socket.request.session.userId }).select('_id');
  chatrooms.forEach((room:{ _id: Schema.Types.ObjectId }) => {
    socket.join(`${room._id}`);
  });
});

const port = process.env.PORT || 3001;

const server = httpServer.listen(port, () => log.init({ label: 'APP', message: `App listening on port ${port}` }));
export { server, io };
