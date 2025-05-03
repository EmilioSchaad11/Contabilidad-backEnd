const express = require("express");
const router = express.Router();
const {
  obtenerCuentasI,
  crearCuentaI,
  eliminarCuentaI,
} = require("../controllers/cuentaiController");

router.get("/", obtenerCuentasI);
router.post("/", crearCuentaI);
router.delete("/:id", eliminarCuentaI);

module.exports = router;
