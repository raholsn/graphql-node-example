const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString
} = require('graphql');

const { mobType } = require('./types');
const { mobInputType } = require('./inputTypes');
const { getMob, getMobs, createMob, rotateMobster } = require('../handler');

const query = new GraphQLObjectType({
  name: 'mobQueries',
  description: 'queries mobs',
  fields: {
    getmob: {
      type: mobType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: getMob
    },
    getmobs: {
      type: GraphQLList(mobType),
      resolve: getMobs
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'mobMutations',
  description: 'mutate mobs',
  fields: {
    createmob: {
      type: mobType,
      args: {
        input: { type: mobInputType }
      },
      resolve: createMob
    },
    rotateMobster: {
      type: mobType,
      args: {
        input: { type: GraphQLString }
      },
      resolve: rotateMobster
    }
  }
});

module.exports = new GraphQLSchema({
  query,
  mutation
});
