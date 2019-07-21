const { getGame, getGames, createGame } = require('../handler');

var root = {
  getGame: getGame,
  getGames: getGames,
  createGame: createGame
};

module.exports = root;
