const router = require("express").Router();
const commentController = require("../controllers/commentController");

router
  .route("/comments")
  .post((req, res) => commentController.create(req, res));

module.exports = router;
