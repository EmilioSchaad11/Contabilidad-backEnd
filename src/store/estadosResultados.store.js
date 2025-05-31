const model = require('../model/estadosResultados.model');

// Funciona para listar la estadosResultados ya en moongo
async function listAllEstadosResultados() {
  return await model.find({}).sort({ fecha_creacion: -1 });
}
async function listEstadosResultadosSort() {
  return await model.findOne({}).sort({ id_resultados: -1 });
}
// Funciona para encontrar la estadosResultados ya en moongo
async function findEstadosResultados(idEstadoResultados) {
  return await model.findOne({ id_resultados: idEstadoResultados });
}
// Funciona para crear la estadosResultados ya en moongo
async function createEstadosResultadosNew(estadosResultados) {
  const newEstadosResultados = new model(estadosResultados);
  return await newEstadosResultados.save();
}

// Funciona para modificar la estadosResultados ya en moongo
async function updataCuentas(idCuenta, body) {
  return await model.findOneAndUpdate({ id_cuenta: idCuenta }, body, { new: true });
}

// Funciona para eliminar la estadosResultados ya en moongo
async function removecuenta(idCuenta) {
  return await model.findOneAndDelete({ id_cuenta: idCuenta });
}

module.exports = {
  listAllEstadosResultados,
  findEstadosResultados,
  listEstadosResultadosSort,
  createEstadosResultadosNew,
};
