const Moment = require("../models/Moment");
const { Picture } = require("../models/Picture");

const momentController = {
  create: async (req, res) => {
    try {
      const { title, author, description } = req.body;

      if (!title) {
        return res.status(422).json({ message: "Título obrigatório." });
      }

      if (!author) {
        return res.status(422).json({ message: "Autor obrigatório." });
      }

      if (!description) {
        return res.status(422).json({ message: "Descrição obrigatória." });
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

      const createdMoment = await Moment.create(moment);

      res.status(201).json({
        createdMoment,
        message: "Momento criado com sucesso!",
      });
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
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { title, author, description, image, comments } = req.body;

      const momentUpdateData = {
        title,
        author,
        description,
        image,
        comments,
      };

      // Verifica se a solicitação contém um arquivo de imagem
      if (req.file) {
        const newPicture = new Picture({
          name: req.file.originalname,
          src: req.file.path,
        });

        const savedPicture = await newPicture.save();

        // Atualiza o momento com o ID da nova imagem
        momentUpdateData.image = savedPicture._id;
      }

      const updatedMoment = await Moment.findByIdAndUpdate(
        id,
        momentUpdateData,
        // Faz com que a função retorne o objeto atualizado em vez do objeto anterior à atualização
        {
          new: true,
        }
      );

      if (!updatedMoment) {
        return res.status(404).json({ message: "Momento não encontrado." });
      }

      res.status(200).json({ updatedMoment, message: "Momento atualizado!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno de servidor!" });
    }
  },
  destroy: async (req, res) => {
    try {
      const id = req.params.id;

      const deletedMoment = await Moment.findByIdAndDelete(id);

      if (!deletedMoment) {
        return res.status(404).json({ message: "Momento não encontrado." });
      }

      res.status(200).json({ deletedMoment, message: "Momento excluído!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno de servidor!" });
    }
  },
};

module.exports = momentController;
