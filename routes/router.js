const router = require("express").Router();
const momentsRouter = require("./moments");
const picturesRouter = require("./pictures");

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Bem vindo ao Moments!" });
});

router.use("/", momentsRouter);
router.use("/", picturesRouter);

module.exports = router;
