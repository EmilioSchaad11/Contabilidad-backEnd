const Cuenta = require("../models/Cuentadmodel");

const obtenerCuentas = async (req, res) => {
  try {
    const cuentas = await Cuenta.find();
    res.json(cuentas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener cuentas" });
  }
};

const crearCuenta = async (req, res) => {
  try {
    const nuevaCuenta = new Cuenta(req.body);
    await nuevaCuenta.save();
    res.json(nuevaCuenta);
  } catch (error) {
    res.status(500).json({ error: "Error al crear cuenta" });
  }
};

const eliminarCuenta = async (req, res) => {
  try {
    await Cuenta.findByIdAndDelete(req.params.id);
    res.json({ message: "Partida de diario eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar partida diario" });
  }
};

module.exports = {
  obtenerCuentas,
  crearCuenta,
  eliminarCuenta,
};
