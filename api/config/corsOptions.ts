import config from '../utils/config';

export default {
  origin: config.REQUEST_DOMAIN,
  credentials: true,
  optionSuccessStatus: 200
};
