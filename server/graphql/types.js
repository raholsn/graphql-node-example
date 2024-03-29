const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const { GraphQLDateTime } = require('graphql-iso-date');

const timerType = new GraphQLObjectType({
  name: 'Timer',
  fields: {
    startDate: {
      type: GraphQLDateTime
    },
    endDate: { type: GraphQLDateTime }
  }
});

const mobsterType = new GraphQLObjectType({
  name: 'Mobster',
  fields: {
    name: { type: GraphQLString },
    position: { type: GraphQLInt }
  }
});

const mobType = new GraphQLObjectType({
  name: 'Mob',
  fields: {
    _id: { type: GraphQLString },
    timer: { type: timerType },
    mobsters: { type: new GraphQLList(mobsterType) }
  }
});

module.exports = { mobType, mobsterType, timerType };
