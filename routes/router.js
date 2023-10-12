const router = require("express").Router();
const momentsRouter = require("./moments");

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Bem vindo ao Moments!" });
});

router.use("/", momentsRouter);

module.exports = router;
