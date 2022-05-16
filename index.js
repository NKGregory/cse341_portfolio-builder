const express = require ('express');
// const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const connect = require ('./db/connect');
// const swaggerUI = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

connect.initDatatbase();

app
//   .use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocument))
//   .use(cors())
  .use(bodyParser.json())
  .use('/', require('./routes'))
  .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next()
  })

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});