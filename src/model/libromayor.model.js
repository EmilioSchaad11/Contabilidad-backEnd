const mongoose = require('mongoose');
const Schame = mongoose.Schema;

// Modelo: LibroMayor.js
const LibroMayorSchema = new Schame({
  id_mayor: { type: Number, unique: true, require: true },
  id_cuenta: { type: Number, ref: 'cuentas', required: true },
  fecha_inicio: { type: Date, default: () => new Date(new Date().getFullYear(), 0, 1) },
  fecha_fin: { type: Date, default: () => new Date(new Date().getFullYear(), 11, 31) },
  saldo_inicial: { type: Number, default: 0 },
  saldo_final: { type: Number, default: 0 },
  movimientos: [
    {
      fecha: Date,
      descripcion: String,
      debito: Number,
      credito: Number,
    },
  ],
});

module.exports = mongoose.model('LibroMayor', LibroMayorSchema);
