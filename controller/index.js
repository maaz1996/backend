module.exports = () => {
  const gameService = require("../services/index")();

  const connect4 = async (req, res, next) => {
    try {
      const payload = req.body;
      const response = await gameService.connect4(payload);

      if (response == "READY") {
        res.status(200).send({
          status: 200,
          message: "The Game is READY along with refreshed scores and starting",
        });
      } else {
        res.status(200).send({
          status: 200,
          message: response,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  return {
    connect4,
  };
};
