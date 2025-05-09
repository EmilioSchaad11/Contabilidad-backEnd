//partidaimodel
const mongoose = require("mongoose");

const partidaISchema = new mongoose.Schema({
  FechaI: { type: Date, required: true }, 
  descripcion: { type: String, required: true, trim: true, minlength: 5 }, 
  tipoCuenta: { type: String, required: true }, 
  monto: { type: Number, required: true, min: 0 } 
}, { timestamps: true });

module.exports = mongoose.model("Partidai", partidaISchema);