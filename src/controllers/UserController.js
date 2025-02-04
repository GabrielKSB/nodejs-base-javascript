const { User } = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { password } = require("../config/database");
const { SELECT } = require("sequelize/lib/query-types");
//const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET =
  "9e0a77e143feb7a51acdc810b1b839d4edd4847716d62a9269335723a8a5a6bd";

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

      const hashPassword = await bcrypt.hash(password, 10);
      console.log(hashPassword);

      const createdUser = await User.create({
        name,
        email,
        password: hashPassword,
        number,
        area_code,
      });
      return res.status(200).json(createdUser);
    } catch (err) {
      return res.status(400).json({ message: "Falha ao cadastrar usuário" });
      //return console.log(err);
    }
  }

  async listAll(req, res) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: "Acesso Negado" });
      }

      try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

        req.userId = decoded.id;

        const users = await User.findAll({
          attributes: ['id', 'email', 'number', 'area_code', 'createdAt', 'updatedAt']
        });

        return res.status(200).json(users);
      } catch (err) {
        return res
          .status(401)
          .json({ message: "Token Inválido, Acesso não autorizado" });
      }
    } catch (err) {
      return res.status(400).json({ message: "Falha ao cadastrar usuário" });
    }
  }

  async listOne(req, res) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: "Acesso Negado" });
      }

      try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

        req.userId = decoded.id;

        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
          return res.status(404).json({ message: "Usuário não Encontrado" });
        }

        return res.status(200).json(user);
      } catch (err) {
        return res
          .status(401)
          .json({ message: "Token Inválido, Acesso não autorizado" });
      }
    } catch (err) {
      return res.status(400).json({ message: "Falha ao listar usuário" });
    }
  }

  async login(req, res) {
    try {
      const userInfo = req.body;

      //Buscar o úsuario no banco
      const user = await User.findOne({ where: { email: userInfo.email } });

      //verificar se o usuario existe no banco
      if (!user) {
        return res.status(404).json({ message: "usuário não encontrado" });
      }

      //Comparar se as senhas do banco e a inserida pelo usuario são iguais
      const isMatch = await bcrypt.compare(userInfo.password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "E-mail ou Senha Inválida" });
      }

      //Gerar o Token JWT
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        JWT_SECRET,
        { expiresIn: "2m" }
      );

      res.status(200).json(token);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Erro no Servidor, tente novamente" });
    }
  }
}

module.exports = new UserController();
