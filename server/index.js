var express = require('express');
var express_graphql = require('express-graphql');
const { getGame, getGames } = require('./handler');
const schema = require('./graphql/schema');
// GraphQL schema

// Root resolver
var root = {
  game: getGame,
  games: getGames
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () => console.log('running on localhost:4000/graphql'));

module.exports = app;
