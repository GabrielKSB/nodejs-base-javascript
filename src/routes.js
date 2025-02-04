const { Router } = require("express");
const UserController = require("./controllers/UserController")

const routes = Router();

routes.get("/health", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

routes.post('/users', UserController.store)
routes.get('/users', UserController.index)
routes.get('/users/:id', UserController.show)

module.exports = routes;
