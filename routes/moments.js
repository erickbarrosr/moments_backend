const router = require("express").Router();
const momentController = require("../controllers/momentController");

router.route("/moments").post((req, res) => momentController.create(req, res));

module.exports = router;
