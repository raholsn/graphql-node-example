let db = [];

const getGame = (_, { id }) => {
  console.log(id);
  return db.filter(game => game.id === id)[0];
};

const getGames = () => {
  console.log(db);
  return db;
};

const createGame = (_, { input }) => {
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

const updateGame = () => {
  return null;
};

module.exports = { getGame, getGames, createGame, updateGame };
