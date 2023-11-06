const User = require("../models/User");
const bcrypt = require("bcrypt");

const userController = {
  create: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (!name) {
        return res.status(422).json({ message: "Digite seu nome." });
      }

      if (!email) {
        return res.status(422).json({ message: "Digite seu e-mail." });
      }

      const userExists = await User.findOne({ email });

      if (userExists) {
        return res
          .status(409)
          .json({ message: "Email já cadastrado no sistema." });
      }

      if (!password) {
        return res.status(422).json({ message: "Digite a sua senha." });
      }

      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(422).json({
          message:
            "A senha deve ter pelo menos 8 caracteres e conter pelo menos uma letra, um número e um caractere especial.",
        });
      }

      if (!confirmPassword) {
        return res.status(422).json({ message: "Confirme a sua senha." });
      }

      if (password !== confirmPassword) {
        return res.status(422).json({ message: "As senhas não conferem." });
      }

      const salt = await bcrypt.genSalt(10);

      const passwordHash = await bcrypt.hash(password, salt);

      const user = new User({
        name,
        email,
        password: passwordHash,
      });

      const createdUser = await User.create(user);

      res
        .status(201)
        .json({ createdUser, message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor." });
    }
  },
};

module.exports = userController;
