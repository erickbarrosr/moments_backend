const router = require("express").Router();
const userController = require("../controllers/userController");

router.route("/auth/register").post(userController.create);

module.exports = router;
