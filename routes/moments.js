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
  .patch(upload.single("image"), (req, res) =>
    momentController.update(req, res)
  );

router
  .route("/moments/:id")
  .delete((req, res) => momentController.destroy(req, res));

module.exports = router;
