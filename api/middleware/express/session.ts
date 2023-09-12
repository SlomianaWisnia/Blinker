import session from 'express-session';
import store from '../../services/store';

import config from '../../utils/config';

const sessionMiddleware = session({
  secret: config.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store,
  cookie: {
      maxAge: 3 * 60 * 60 * 1000, //3H
      httpOnly: true,
  },
});

export default sessionMiddleware;
