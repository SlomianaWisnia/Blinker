import mongoose from 'mongoose';
import log from '../utils/log';

import config from '../utils/config';
import exit from '../utils/errorHandling/exit';

mongoose.connect(`mongodb://${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`)
  .catch((ex) => {
    log.error({ label: 'DB', message: ex });
    process.exit(1);
  });

mongoose.connection.on('open', () =>
  log.info({ label: 'DB', message: `Opened connection to ${config.DB_NAME} database on port ${config.DB_PORT}` })
);

mongoose.connection.on('disconnected', () => {
  log.error({ label: 'DB', message:  `Lost connection to MongoDB database!` });
});

mongoose.connection.on('reconnected', () => {
  log.info({ label: 'DB', message:  `Reconnected to MongoDB database` });
});

mongoose.connection.on('connected', () =>
  log.info({ label: 'DB', message: 'Established MongoDB connection' })
);

process.on('SIGINT', () => {
  mongoose.connection.close();
  exit({ label: 'DB', message: 'Forced to close MongoDB connection!' });
});