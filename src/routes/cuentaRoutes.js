const express = require("express");
const router = express.Router();
const Cuenta = require("../models/Cuenta");

router.get("/", async (req, res) => {
  const cuentas = await Cuenta.find();
  res.json(cuentas);
});

router.post("/", async (req, res) => {
  const nuevaCuenta = new Cuenta(req.body);
  await nuevaCuenta.save();
  res.json(nuevaCuenta);
});

router.delete("/:id", async (req, res) => {
  try {
    await Cuenta.findByIdAndDelete(req.params.id);
    res.json({ message: "Partida de diario eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar partida diario:", error);
    res.status(500).json({ error: "Error al eliminar partida diario" });
  }
});

module.exports = router;
