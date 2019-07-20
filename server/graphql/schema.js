var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
      game(id: Int!): Game
      games: [Game]
    }
    type Game {
      id: Int
      title: String
      publisher: String
      genre: [String]
    }
`);

module.exports = schema;
