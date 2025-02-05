const { Router } = require("express")
const UserController = require("./controllers/UserController")

const routes = Router()

routes.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server on" })
})

routes.get("/users", UserController.listAll) //Listar usuarios
routes.get("/users/:id", UserController.listOne) //Listar um único usuario de acordo com a ID
routes.post("/users", UserController.store) //Registrar o Usuário
routes.post("/users/login", UserController.login) //Realizar o Login

module.exports = routes
