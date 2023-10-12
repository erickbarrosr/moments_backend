const router = require("express").Router();
const momentController = require("../controllers/momentController");
const upload = require("../config/multer");

router.route("/moments").post((req, res) => momentController.create(req, res));

module.exports = router;
