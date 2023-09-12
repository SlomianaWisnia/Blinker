import config from '../../utils/config';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blinker API',
      version: '1.0.0',
      description: 'API for Blinker Web App'
    },
  },
  servers: [
    {
      url: config.SERVER_DOMAIN
    }
  ],
  apis: ['./docs/rest/*.ts', './docs/rest/**/*.ts']
};

export default swaggerJSDoc(options);
