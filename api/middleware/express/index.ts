import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import routes from '../../routes';

import sessionMiddleware from '../express/session';

const router = express.Router();

const corsOptions = {
  origin: process.env.REQUEST_DOMAIN,
  credentials: true,
  optionSuccessStatus: 200
};

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
