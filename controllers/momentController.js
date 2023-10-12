const Moment = require("../models/Moment");

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

      const moment = {
        title,
        author,
        description,
      };

      const momentCreated = await Moment.create(moment);

      res
        .status(200)
        .json({ momentCreated, message: "Momento criado com sucesso!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro interno de servidor!" });
    }
  },
};

module.exports = momentController;
