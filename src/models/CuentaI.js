const mongoose = require("mongoose");

const cuentaISchema = new mongoose.Schema({
  FechaI: String,
  descripcion: String,
  tipoCuenta: String,
  monto: Number,
});

module.exports = mongoose.model("CuentaI", cuentaISchema, "cuentai");