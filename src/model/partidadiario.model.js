// Modelo: LibroMayor.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartidaDiario = Schema(
  {
    id_partidaDiario: Number,
    Fecha: Date,
    Descripcion: String,
  },
  {
    collection: 'partida_diario',
  }
);

module.exports = mongoose.model('partida_diario', PartidaDiario);
