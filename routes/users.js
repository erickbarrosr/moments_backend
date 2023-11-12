const router = require("express").Router();
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");

router.route("/auth/register").post(userController.create);

router.route("/auth/login").post(loginController.create);

module.exports = router;
