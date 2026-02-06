const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Petites Annonces API',
      version: '1.0.0',
      description: 'API REST pour une plateforme de petites annonces. Développée avec Express.js, Sequelize et MySQL.',
      contact: {
        name: 'Yannis LEVY',
        url: 'https://github.com/Lazimov'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Entrez votre token JWT (sans le préfixe "Bearer")'
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
