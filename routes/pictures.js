const router = require("express").Router();
const pictureController = require("../controllers/pictureController");
const upload = require("../config/multer");

router
  .route("/pictures")
  .post(upload.single("file"), (req, res) =>
    pictureController.create(req, res)
  );

module.exports = router;
