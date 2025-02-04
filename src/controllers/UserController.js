const { User } = require("../models");

class UserController {
  async store(req, res) {
    try {
      const { name, email, password, number, area_code } = req.body;

      const userAlreadyExists = await User.findOne({ where: { email } });

      if (userAlreadyExists) {
        return res.status(400).json({ message: "Esse usuário já existe." });
      }

      if (!name || !email) {
        return res.status(400).json({ message: "Insira um nome e email." });
      }

      const createdUser = await User.create({ name, email, password, number, area_code });

      return res.status(200).json(createdUser);
    } catch (err) {
      return res.status(400).json({ message: "Falha ao cadastrar usuário" });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(400).json({ message: "Falha ao cadastras usuário" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não Encontrado" });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ message: "Falha ao listar usuário" });
    }
  }
}

module.exports = new UserController();
