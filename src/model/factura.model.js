const mongoose = require('mongoose');

const FacturaSchema = new mongoose.Schema({
  id_factura: { type: Number, unique: true, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: Date, required: true },
  precio_neto: { type: Number, required: true },
  monto_iva: { type: Number, required: true },
  importe_total: { type: Number, required: true }
});

module.exports = mongoose.model('Factura', FacturaSchema);