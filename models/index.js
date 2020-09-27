const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const game = new Schema({
  player: {
    type: String,
    default: "none",
  },
  board: {
    type: Array,
  },
  won: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  start: {
    type: String,
    default: 0,
  },
});

const gameSchema = mongoose.model("connect4", game);
module.exports = gameSchema;
