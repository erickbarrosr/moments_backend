const Moment = require("../models/Moment");
const { Picture } = require("../models/Picture");

const momentController = {
  create: async (req, res) => {
    try {
      const { title, author, description } = req.body;

      if (!title) {
        return res.status(422).json({ message: "Por favor, digite o título." });
      }

      if (!author) {
        return res.status(422).json({ message: "Autor obrigatório." });
      }

      if (!description) {
        return res.status(422).json({ message: "Digite uma descrição." });
      }

      // Verifique se um arquivo de imagem foi enviado
      if (!req.file) {
        return res
          .status(422)
          .json({ message: "Faça o upload de uma imagem." });
      }

      // Processar o upload da imagem e salvar no modelo Picture
      const newPicture = new Picture({
        name: req.file.originalname,
        src: req.file.path,
      });
      const savedPicture = await newPicture.save();

      const moment = {
        title,
        author,
        description,
        image: savedPicture._id, // Associe o _id do modelo Picture
      };

      const momentCreated = await Moment.create(moment);

      res
        .status(201)
        .json({ momentCreated, message: "Momento criado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno de servidor!" });
    }
  },
  index: async (req, res) => {
    try {
      const moments = await Moment.find();

      res.json(moments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno de servidor!" });
    }
  },
  show: async (req, res) => {
    try {
      const id = req.params.id;
      const moment = await Moment.findById(id);

      if (!moment) {
        return res.status(404).json({ message: "Momento não encontrado." });
      }

      res.json(moment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno de servidor!" });
    }
  },
};

module.exports = momentController;
