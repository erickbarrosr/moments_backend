const router = require("express").Router();
const momentController = require("../controllers/momentController");
const upload = require("../config/multer");
const commentController = require("../controllers/commentController");

// Rotas para os momentos
router
  .route("/moments")
  .post(upload.single("image"), momentController.create)
  .get(momentController.index);

router
  .route("/moments/:id")
  .get(momentController.show)
  .patch(upload.single("image"), momentController.update)
  .delete(momentController.destroy);

// Rota para criar comentários em momentos
router.route("/moments/:momentId/comments").post(commentController.create);

module.exports = router;
