const express = require('express');
const graphqlHTTP = require('express-graphql');
const appSchema = require('./schema/appSchema')
const mongoose = require('mongoose').connect('mongodb://localhost/graphql')
const app = express();
 

app.use('/graphql', graphqlHTTP({
  schema: appSchema,
  graphiql: true
}))
 
app.listen(4000);
console.log('Listening...')