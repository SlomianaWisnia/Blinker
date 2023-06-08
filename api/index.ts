import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import './services/db';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import specs from './docs/index';
import auth from './routes/auth';
import register from './routes/register';
import log from './utils/log';

dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });

const app = express();
app.use(express.json());
app.use(cors({
  origin: '127.0.0.1',
  credentials: true
}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 3 * 60 * 60 * 1000, //3H
    secure: process.env.NODE_ENV === 'production',
    domain: '127.0.0.1',
    sameSite: 'none',
    httpOnly: true
  }
}));
if (process.env.NODE_ENV === 'development') {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
}
app.use('/api/auth', auth);
app.use('/api/register', register);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => log.init({ label: 'APP', message: `App listening on port ${port}` }));

export default server;
