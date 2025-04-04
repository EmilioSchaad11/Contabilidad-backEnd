const model = require('../model/cuentas.model');

// Funciona para listar la cuenta ya en moongo
async function listAllCuentas() {
  return await model.find({});
}
async function listCuentasSort() {
  return await model.find({}).sort({ id_cuenta: -1 }).limit(1);
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

// Funciona para encontrar la cuenta ya en moongo
async function findCuentas(idCuenta) {
  return await model.findOne({ id_cuenta: idCuenta });
}

/*async function listAllCuentas() {
  return await model.find({});
}



// Funciona para eliminar la cuenta ya en moongo
async function deleteCuentas(idEmpleado) {
  return await model.findByIdAndDelete(idEmpleado);
}
 */
module.exports = {
  listAllCuentas,
  listCuentasSort,
  createCuentasNew,
  updataCuentas,
  findCuentas,
  /*deleteCuentas */
};
