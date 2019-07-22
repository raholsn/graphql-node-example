var mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  id: Int,
  title: String,
  publisher: String,
  developer: String,
  genre: [String]
});

module.exports = new mongoose.model('game', gameSchema);
