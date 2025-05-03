const mongoose = require("mongoose");

const cuentaSchema = new mongoose.Schema({
  FechaD: String,
  descripcion: String,
  tipoCuenta: String,
  monto: Number,
});

module.exports = mongoose.model("Cuenta", cuentaSchema);
