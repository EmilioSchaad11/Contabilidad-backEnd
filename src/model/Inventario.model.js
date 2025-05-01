const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const INVENTARIO = new Schema({
  id_inventario: { type: Number, unique: true, required: true },
  fecha: { type: Date, required: true},
  cantidad: { type: Number, required: true },
  monto: { type: Number, required: true },
  cuenta: { type: String, required: true }, // Asegúrate de que esta sea una referencia o un valor según sea necesario
  descripcion: { type: String, required: true },
  categoria: { type: String, required: true },
  fecha_creacion: {
    type: Date,
    default: Date.now // Fecha actual por defecto
  }
});

module.exports = mongoose.model('inventarios', INVENTARIO);
