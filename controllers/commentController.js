const { Comment } = require("../models/Comment");
const Moment = require("../models/Moment");

const commentController = {
  create: async (req, res) => {
    try {
      const { username, text } = req.body;
      const momentId = req.params.momentId;

      if (!username || !text) {
        return res.status(422).json({ message: "Preencha todos os campos." });
      }

      const comment = {
        username,
        text,
        momentId,
      };

      const createdComment = await Comment.create(comment);

      if (!createdComment) {
        return res
          .status(422)
          .json({ message: "Falha ao adicionar comentário." });
      }

      const moment = await Moment.findById(momentId);

      if (!moment) {
        return res.status(404).json({ message: "Momento não encontrado." });
      }

      if (!moment.comments) {
        moment.comments = []; // Inicializa como um array vazio se não estiver definido
      }

      moment.comments.push(createdComment._id);

      await moment.save();

      res
        .status(201)
        .json({ createdComment, message: "Comentário adicionado!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};

module.exports = commentController;
