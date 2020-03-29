const { Router } = require("express");
const CesarController = require("./controllers/CesarController");

const routes = new Router();

routes.get("/", CesarController.salvarArquivo);
routes.get("/decifrar", CesarController.decifrar);
routes.post("/enviar", CesarController.enviar);

module.exports = routes;
