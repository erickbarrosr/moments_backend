/*
const { Picture } = require("../models/Picture");

const pictureController = {
  create: async (req, res) => {
    try {
      const { name } = req.body;

      const file = req.file;

      const picture = new Picture({
        name,
        src: file.path,
      });

      await picture.save();

      res.status(200).json({ picture, message: "Imagem enviada!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Falha ao enviar imagem." });
    }
  },
};

module.exports = pictureController;
*/
