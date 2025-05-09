const Partidad = require("../model/partidadmodel");

function obtenerPartidasd() {
  return Partidad.find();
}

function agregarPartidad(data) {
  const nueva = new Partidad(data);
  return nueva.save();
}

function eliminarPartidad(id) {
  return Partidad.findByIdAndDelete(id);
}

module.exports = {
  obtenerPartidasd,
  agregarPartidad,
  eliminarPartidad
};