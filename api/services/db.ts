import mongoose from 'mongoose';
import dotenv from 'dotenv';
import log from '../utils/log';

dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });

export default mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
  .then(() => log.init({ label: 'DB', message: 'Connected to MongoDB' }))
  .catch((err) => log.error({ label: 'DB', message: err }));