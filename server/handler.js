const games = require('../server/mongo/mock');

const getGame = args => {
  return games.filter(game => game.id === args.id)[0];
};

const getGames = () => {
  return games;
};

module.exports = { getGame, getGames };
// exports.getGame = args => {
//   return games.filter(game => game.id === args.id)[0];
// };
