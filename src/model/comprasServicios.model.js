const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const COMPRAS_SERVICIOS = Schema({
  id_compra: { type: Number, unique: true, required: true },
  nombre: { type: String, required: true },
  proveedor: { type: String, required: true },
  monto: { type: Number, required: true },
  fecha_creacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('comprasServicios', COMPRAS_SERVICIOS);
