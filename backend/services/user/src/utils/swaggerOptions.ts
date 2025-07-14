import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VibeLink',
      version: '1.0.0',
    },
    servers: [
      {
        url: process.env.APP_URL,
      },
    ],
  },
  apis: ['./src/routes/**/*.ts'],
};

const specs = swaggerJsdoc(options);

export default specs;
