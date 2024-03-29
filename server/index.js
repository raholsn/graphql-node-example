var express = require('express');
var express_graphql = require('express-graphql');
const schema = require('./graphql/schema');

var app = express();

app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    graphiql: true
  })
);

app.listen(4000, () => console.log('running on localhost:4000/graphql'));

module.exports = app;
