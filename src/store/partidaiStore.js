//partidaiStore
const Partidai = require("../model/partidaimodel");

function obtenerPartidasI() {
  return Partidai.find();
}

function agregarPartidaI(data) {
  const nueva = new Partidai(data);
  return nueva.save();
}

function eliminarPartidaI(id) {
  return Partidai.findByIdAndDelete(id);
}

module.exports = {
  obtenerPartidasI,
  agregarPartidaI,
  eliminarPartidaI
};