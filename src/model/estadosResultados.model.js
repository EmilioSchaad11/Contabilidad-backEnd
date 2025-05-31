const mongoose = require('mongoose');
const Schame = mongoose.Schema;

const ESTADOSRESULTADOS = Schame({
  id_resultados: { type: Number, unique: true, require: true },
  fecha_inicio: { type: Date },
  fecha_fin: { type: Date },
  ingresos_totales: { type: Number, require: true },
  gastos_totales: { type: Number, require: true },
  utilidad_neta: { type: Number, require: true },
  id_cuenta: { type: Number, ref: 'cuentas', required: true },
});

module.exports = mongoose.model('EstadosResultados', ESTADOSRESULTADOS);
