import dotenv from 'dotenv';
dotenv.config({ path: `config/${process.env.NODE_ENV}.env` });

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
      url: process.env.SERVER_DOMAIN
    }
  ],
  apis: ['./docs/rest/*.ts', './docs/rest/**/*.ts']
};

export default swaggerJSDoc(options);
