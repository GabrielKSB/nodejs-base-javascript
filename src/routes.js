const { Router } = require("express")
const UserController = require("./controllers/UserController")
const cors = require("cors")
const { router } = require("./app")

const routes = Router()
routes.use(cors())

routes.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server on" })
})

routes.get("/users/listUsers", UserController.listAll) //Listar usuarios
routes.get("/users/listUsers/:id", UserController.listOne) //Listar um único usuario de acordo com a ID
routes.post("/users/register", UserController.store) //Registrar o Usuário
routes.post("/users/login", UserController.login) //Realizar o Login

module.exports = routes
