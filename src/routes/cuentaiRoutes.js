const express = require("express");
const router = express.Router();
const CuentaI = require("../models/CuentaI");

router.get("/", async (req, res) => {
  const cuentas = await CuentaI.find();
  res.json(cuentas);
});

router.post("/", async (req, res) => {
  const nuevaCuenta = new CuentaI(req.body);
  await nuevaCuenta.save();
  res.json(nuevaCuenta);
});

router.delete("/:id", async (req, res) => {
  try {
    await CuentaI.findByIdAndDelete(req.params.id);
    res.json({ message: "Cuenta inicial eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar cuenta inicial:", error);
    res.status(500).json({ error: "Error al eliminar cuenta inicial" });
  }
});

module.exports = router;