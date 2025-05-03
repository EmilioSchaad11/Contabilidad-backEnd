const Cuentai = require("../models/Cuentaimodel");

const obtenerCuentasI = async (req, res) => {
  const cuentas = await Cuentai.find();
  res.json(cuentas);
};

const crearCuentaI = async (req, res) => {
  const nueva = await Cuentai.create(req.body);
  res.json(nueva);
};

const eliminarCuentaI = async (req, res) => {
  await Cuentai.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Cuenta eliminada" });
};

module.exports = {
  obtenerCuentasI,
  crearCuentaI,
  eliminarCuentaI,
};
