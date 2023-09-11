import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import MongoDBStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

import routes from '../../routes';

const router = express.Router();

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

router.use(express.json());
router.use(cors(corsOptions));
router.use(cookieParser());
router.use(sessionMiddleware);
router.use(helmet({
  crossOriginResourcePolicy: false,
}));
router.use(routes);

// Path for user static files
router.use('/media/users', express.static(__dirname + '/media/users'));

export default router;
