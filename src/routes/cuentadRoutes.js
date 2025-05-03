const express = require("express");
const router = express.Router();
const {
  obtenerCuentas,
  crearCuenta,
  eliminarCuenta,
} = require("../controllers/cuentadController");

router.get("/", obtenerCuentas);
router.post("/", crearCuenta);
router.delete("/:id", eliminarCuenta);

module.exports = router;
