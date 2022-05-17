const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipes',
    description: 'Recipe Share Site API',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  // host: 'cse341-ngregory-portfolio.herokuapp.com',
  // schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

// swaggerAutogen(outputFile, endpointsFiles, doc);

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index.js'); // Your project's root file
});