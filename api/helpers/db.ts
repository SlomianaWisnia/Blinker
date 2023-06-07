import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });

export default mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.log(err));