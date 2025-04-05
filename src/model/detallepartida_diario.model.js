// Modelo: LibroMayor.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetallePartidaDiario = new Schema(
  {
    id_partidaDiario: { type: Number, unique: true, require: true },
    id_cuenta: { type: Number, ref: 'cuentas' },
    Debe: {
      type: Number,
    },
    Haber: {
      type: Number,
    },
    descripcion: { type: String, default: '' },
  },
  {
    collection: 'detallePartida_Diario',
  }
);

module.exports = mongoose.model('detallePartida_Diario', DetallePartidaDiario);
