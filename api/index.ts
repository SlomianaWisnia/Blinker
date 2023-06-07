import express from 'express';
import dotenv from 'dotenv';
import './services/db';
import auth from './routes/auth';

dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });

const app = express();
app.use('/api/auth', auth);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => console.log(`App listening on port ${port}...`));

export default server;
