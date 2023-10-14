const router = require("express").Router();
const momentController = require("../controllers/momentController");
const upload = require("../config/multer");

router
  .route("/moments")
  .post(upload.single("image"), (req, res) =>
    momentController.create(req, res)
  );

router.route("/moments").get((req, res) => momentController.index(req, res));

router.route("/moments/:id").get((req, res) => momentController.show(req, res));

router
  .route("/moments/:id")
  .put(upload.single("image"), (req, res) => momentController.update(req, res));

module.exports = router;
