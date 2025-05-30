const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CUENTAS = new Schema({
  id_cuenta: { type: Number, unique: true, required: true },
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  fecha_creacion: {
    type: Date,
    default: Date.now // Fecha actual por defecto
  }
});

module.exports = mongoose.model('cuentas', CUENTAS);
