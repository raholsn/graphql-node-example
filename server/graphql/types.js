const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const gameType = new GraphQLObjectType({
  name: 'Game',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    publisher: { type: GraphQLString },
    developer: { type: GraphQLString },
    genre: { type: new GraphQLList(GraphQLString) }
  }
});

module.exports = { gameType };
