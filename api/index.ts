import config from './utils/config';
import './services/db';
import log from './utils/log';

import app from './services/app';
import httpServer from './services/http';
import expressMiddlewares from './middleware/express';

import './middleware/socket';

app.use(expressMiddlewares);

const port = config.APP_PORT || 3001;

const server = httpServer.listen(port, () => log.init({ label: 'APP', message: `App listening on port ${port}` }));
export { server };
