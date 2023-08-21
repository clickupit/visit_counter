const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Visit Counter API',
      version: '1.0.0',
      description: 'API for tracking visitor logs.',
    },
  },
  apis: ['./api-routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec };
