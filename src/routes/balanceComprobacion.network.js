const express = require("express");
const router = express.Router();
const controller = require("../controllers/balanceComprobacion.controller");

router.post("/", controller.agregar);
router.get("/", controller.listar);
router.delete("/:id", controller.eliminar);

module.exports = router;
