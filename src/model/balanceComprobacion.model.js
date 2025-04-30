const mongoose = require("mongoose");

const BalanceCompSchema = new mongoose.Schema({
  cuenta: { type: mongoose.Schema.Types.ObjectId, ref: "Cuenta", required: true },
  fecha: { type: Date, required: true },
  debito: { type: Number, default: 0 },
  credito: { type: Number, default: 0 }
});

module.exports = mongoose.model("BalanceComprobacion", BalanceCompSchema);
