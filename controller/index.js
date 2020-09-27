module.exports = () => {
  const gameService = require("../services/index")();

  const connect4 = async (req, res, next) => {
    try {
      const payload = req.body;
      const response = await gameService.connect4(payload);
      if (response) {
        res.status(200).send({
          status: 400,
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
