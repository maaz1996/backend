const router = require("express-promise-router")();
const gameController = require("../controller/index")();
router
  .route("/connect4")
  .post((req, res, next) => gameController.connect4(req, res, next));

module.exports = router;
