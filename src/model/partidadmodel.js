const mongoose = require("mongoose");

const partidaSchema = new mongoose.Schema({
  FechaD: { type: Date, required: true }, 
  descripcion: { type: String, required: true, trim: true, minlength: 1 }, 
  tipoCuenta: { type: String, required: true }, 
  monto: { type: Number, required: true, min: 0 } 
}, { timestamps: true });

module.exports = mongoose.model("Partida", partidaSchema);