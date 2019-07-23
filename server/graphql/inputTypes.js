const {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList
} = require('graphql');

const gameInputType = new GraphQLInputObjectType({
  name: 'GameInput',
  fields: {
    title: { type: GraphQLString },
    publisher: { type: GraphQLString },
    developer: { type: GraphQLString },
    genre: { type: new GraphQLList(GraphQLString) }
  }
});

module.exports = { gameInputType };
