const {
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql');

const timerInputType = new GraphQLInputObjectType({
  name: 'TimerInput',
  fields: {
    rotationTimeInMinutes: { type: GraphQLInt }
  }
});

const mobsterInputType = new GraphQLInputObjectType({
  name: 'MobsterInput',
  fields: {
    name: { type: GraphQLString },
    position: { type: GraphQLInt }
  }
});

const mobInputType = new GraphQLInputObjectType({
  name: 'MobInput',
  fields: {
    timer: { type: timerInputType },
    mobsters: { type: new GraphQLList(mobsterInputType) }
  }
});

module.exports = { mobInputType, mobsterInputType, timerInputType };
