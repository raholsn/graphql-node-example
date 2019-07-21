var {
  buildSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType
} = require('graphql');

var schema = buildSchema(`
    type Query {
      getGame(id: Int!): Game
      getGames: [Game]
    }
    type Game {
      id: Int
      title: String
      publisher: String
      developer: String
      genre: [String]
    }
    type Mutation {
      createGame(input: GameCommand): Game
      updateGame(id: ID!, input: GameCommand): Game
    }
    input GameCommand
    {
      title: String
      publisher: String
      developer: String
      genre: [String]
    }
`);

module.exports = schema;
