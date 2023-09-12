import MongoDBStore from "connect-mongo";

const store = MongoDBStore.create({
  mongoUrl: `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
  collectionName: 'sessions',
  autoRemove: 'interval',
  stringify: false,
  ttl: 3 * 60 * 60 //3H
});

export default store;
