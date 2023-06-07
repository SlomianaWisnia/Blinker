import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import './services/db';
import auth from './routes/auth';

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
app.use('/api/auth', auth);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => console.log(`App listening on port ${port}...`));

export default server;
