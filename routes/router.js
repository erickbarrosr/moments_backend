const router = require("express").Router();
const momentsRouter = require("./moments");
const commentsRouter = require("./comments");
//const picturesRouter = require("./pictures");

router.route("/").post((res) => {
  res.status(200).json({ message: "Bem vindo ao Moments!" });
});

router.use("/", momentsRouter);
router.use("/", commentsRouter);
//router.use("/", picturesRouter);

module.exports = router;
