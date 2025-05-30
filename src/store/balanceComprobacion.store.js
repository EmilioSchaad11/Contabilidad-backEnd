const RegistroBalance = require("../model/balanceComprobacion.model");

function agregarRegistro(data) {
  const nuevo = new RegistroBalance(data);
  return nuevo.save();
}

function obtenerRegistros() {
  return RegistroBalance.find().populate("cuenta");
}

function eliminarRegistro(id) {
  return RegistroBalance.findByIdAndDelete(id);
}

module.exports = {
  agregarRegistro,
  obtenerRegistros,
  eliminarRegistro

};
