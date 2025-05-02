const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema({
  factura: { type: mongoose.Schema.Types.ObjectId, ref: "facturas", required: true },
  fecha: { type: Date, required: true },
  nombre: { type: String, required: true },
  precioNeto: { type: Number, required: true },
  montoIVA: { type: Number, required: true },
  total: { type: Number, required: true }
});

module.exports = mongoose.model("Venta", VentaSchema);
