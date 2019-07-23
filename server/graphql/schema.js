const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLString
} = require('graphql');

const { gameType } = require('./types');
const { gameInputType } = require('./inputTypes');
const { getGame, getGames, createGame, updateGame } = require('../handler');

const query = new GraphQLObjectType({
  name: 'GameQueries',
  description: 'queries games',
  fields: {
    getGame: {
      type: gameType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: getGame
    },
    getGames: {
      type: GraphQLList(gameType),
      resolve: getGames
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'GameMutations',
  description: 'mutate games',
  fields: {
    createGame: {
      type: gameType,
      args: {
        input: { type: gameInputType }
      },
      resolve: createGame
    },
    updateGame: {
      type: gameType,
      args: {
        id: { type: GraphQLString },
        input: { type: gameInputType }
      },
      resolve: updateGame
    }
  }
});

module.exports = new GraphQLSchema({
  query,
  mutation
});
