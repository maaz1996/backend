const { yellow } = require("color-name");
const { base } = require("../models/index");

module.exports = () => {
  const gameschema = require("../models/index");
  const connect4 = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { request } = payload;
        if (request == "START") {
          await gameschema.deleteMany({});
          let board = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ];

          won = false;
          start = 0;
          const gameresult = new gameschema({
            board,
            won,
            start,
          });
          await gameresult.save();

          resolve("READY");
        } else {
          const { column } = payload;
          const findgame = await gameschema.find({});
          var won = findgame[0].won;
          var board = findgame[0].board;
          var player = findgame[0].player;
          var start = findgame[0].start;
          const _id = findgame[0]._id;

          while (!won) {
            start++;
            var empty = 0;
            console.log(start);
            if (start % 2 != 0) {
              player = "yellow";
              for (let j = 0; j < 6; j++) {
                if (board[column][j] == 0) {
                  empty = 1;
                  console.log("validmove for yellow");
                  board[column][j] = "yellow";
                  break;
                }
              }
              if (empty == 0) {
                console.log("Invalidmove for yellow");
              }
              let [user] = await gameschema.find({
                _id: _id,
              });

              if (user) {
                user = await user.updateOne(
                  {
                    board: board,
                    won: false,
                    player: "yellow",
                    start: start,
                  },
                  {
                    new: true,
                  }
                );
                user.ok === 1
                  ? resolve("valid move for yellow")
                  : resolve("Updation Failed, Please Check");
              }
            } else {
              player = "red";
              for (let j = 0; j < 6; j++) {
                if (board[column][j] == 0) {
                  empty = 1;
                  console.log("validmove for red");
                  board[column][j] = "red";
                  break;
                }
              }
              if (empty == 0) {
                console.log("invalidmove for red");
                won = true;
              }
              let [user] = await gameschema.find({
                _id: _id,
              });

              if (user) {
                user = await user.updateOne(
                  {
                    board: board,
                    won: false,
                    player: "red",
                    start: start,
                  },
                  {
                    new: true,
                  }
                );
                user.ok === 1
                  ? resolve("valid move for red")
                  : resolve("Updation Failed, Please Check");
              }
            }
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    connect4,
  };
};
