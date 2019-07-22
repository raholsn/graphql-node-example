var express = require('express');
var express_graphql = require('express-graphql');
const schema = require('./graphql/schema');
const root = require('./graphql/resolver');

const mongoose = require('mongoose');

var app = express();
app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

app.listen(4000, () => console.log('running on localhost:4000/graphql'));

module.exports = app;
