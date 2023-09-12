import dotenv from 'dotenv';
import './services/db';
import log from './utils/log';

import app from './services/app';
import httpServer from './services/http';
import expressMiddlewares from './middleware/express';

import './middleware/socket';

dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });

app.use(expressMiddlewares);

const port = process.env.PORT || 3001;

const server = httpServer.listen(port, () => log.init({ label: 'APP', message: `App listening on port ${port}` }));
export { server };
