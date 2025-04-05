const model = require('../model/libromayor.model');

// Funciona para listar la cuenta ya en moongo
async function listAllCuentas() {
  return await model.find({});
}
async function listLibroMayorSort() {
  return await model.findOne({}).sort({ id_mayor: -1 });
}
// Funciona para encontrar la cuenta ya en moongo
async function findCuentas(idCuenta) {
  return await model.findOne({ id_cuenta: idCuenta });
}

// Funciona para crear la cuenta ya en moongo
async function crearLibroMayor(libroMayor) {
  const newLibroMayor = new model(libroMayor);
  return await newLibroMayor.save();
}

module.exports = {
  listLibroMayorSort,
  crearLibroMayor,
};
