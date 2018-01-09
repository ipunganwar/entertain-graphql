const express = require('express'),
  graphqlHTTP = require('express-graphql'),
  appSchema = require('./schema/appSchema'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logger('dev'))
 
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/graphql', { useMongoClient: true });

app.use('/graphql', graphqlHTTP({
  schema: appSchema,
  graphiql: true
}))
 
app.listen(4000);
console.log('Listening 4000...')