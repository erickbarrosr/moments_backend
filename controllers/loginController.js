const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = {
  create: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(422).json({ message: "Digite seu e-mail." });
      }

      if (!password) {
        return res.status(422).json({ message: "Digite a sua senha." });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Usuário não encotrado." });
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(401).json({ message: "Senha inválida." });
      }

      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      res.status(200).json({ message: "Sucesso na autenticação!", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};

module.exports = loginController;
