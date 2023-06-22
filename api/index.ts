import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import './services/db';
import swaggerUI from 'swagger-ui-express';
import specs from './docs/index';
import auth from './routes/auth';
import authorization from './middleware/auth';
import register from './routes/register';
import getLastMessages from './routes/getLastMessages';
import authVerify from './routes/auth-verify';
import log from './utils/log';

dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });

const app = express();
app.use(express.json());

const corsOptions = {
  origin: process.env.REQUEST_DOMAIN,
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(
  session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
          maxAge: 3 * 60 * 60 * 1000, //3H
          httpOnly: true,
      },
  })
);
if (process.env.NODE_ENV === 'development') {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
}
app.use('/api/auth', auth);
app.use('/api/register', register);
app.use('/api/get-last-messages', getLastMessages);
app.use('/api/auth-verify', [authorization, authVerify]);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => log.init({ label: 'APP', message: `App listening on port ${port}` }));

export default server;
