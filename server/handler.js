let db = [];
const getGame = args => {
  return db.filter(game => game.id === args.id)[0];
};

const getGames = () => {
  return db;
};

const createGame = ({ input }) => {
  const game = {
    id: db.length + 1,
    title: input.title,
    publisher: input.publisher,
    developer: input.developer,
    genre: input.genre
  };

  db.push(game);

  return game;
};

module.exports = { getGame, getGames, createGame };
