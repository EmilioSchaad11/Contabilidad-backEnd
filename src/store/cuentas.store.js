const model = require('../model/cuentas.model');

// Funciona para listar la cuenta ya en moongo
async function listAllCuentas() {
  return await model.find({}).sort({ fecha_creacion: -1 });
}
async function listCuentasSort() {
  return await model.findOne({}).sort({ id_cuenta: -1 });
}
// Funciona para encontrar la cuenta ya en moongo
async function findCuentas(idCuenta) {
  return await model.findOne({ id_cuenta: idCuenta });
}
// Funciona para crear la cuenta ya en moongo
async function createCuentasNew(cuenta) {
  const newCuenta = new model(cuenta);
  return await newCuenta.save();
}

// Funciona para modificar la cuenta ya en moongo
async function updataCuentas(idCuenta, body) {
  return await model.findOneAndUpdate({ id_cuenta: idCuenta }, body, { new: true });
}

// Funciona para eliminar la cuenta ya en moongo
async function removecuenta(idCuenta) {
  return await model.findOneAndDelete({ id_cuenta: idCuenta });
}

module.exports = {
  listAllCuentas,
  listCuentasSort,
  createCuentasNew,
  updataCuentas,
  findCuentas,
  removecuenta,
};
