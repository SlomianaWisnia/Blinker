import MongoDBStore from 'connect-mongo';
import config from '../utils/config';

const store = MongoDBStore.create({
  mongoUrl: `mongodb://${config.DB_HOST}/${config.DB_NAME}`,
  collectionName: 'sessions',
  autoRemove: 'interval',
  stringify: false,
  ttl: 3 * 60 * 60 //3H
});

export default store;
