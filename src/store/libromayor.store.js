const model = require('../model/libromayor.model');

// Funciona para listar la cuenta ya en moongo
async function listLibroMayorSort() {
  return await model
    .find({})
    .populate({
      path: 'id_cuenta',
      model: 'cuentas',
      foreignField: 'id_cuenta',
      select: 'nombre tipo',
    })
    .sort({ id_mayor: -1 });
}
async function listLibroMayorSortOne() {
  return await model.findOne({}).sort({ id_mayor: -1 });
}

// Funciona para encontrar la cuenta ya en moongo
async function findLibroMayor(idMayor) {
  return await model.findOne({ id_mayor: idMayor }).populate({
    path: 'id_cuenta',
    model: 'cuentas',
    foreignField: 'id_cuenta',
    select: 'nombre tipo',
  });
}
async function findLibroMayorOpcional(opcional) {
  return await model.findOne(opcional);
}

// Funciona para crear la cuenta ya en moongo
async function crearLibroMayor(libroMayor) {
  const newLibroMayor = new model(libroMayor);
  return await newLibroMayor.save();
}
// Funciona para eliminar el libro mayor en moongo
async function removeLibroMayor(idLibroMayor) {
  return await model.findOneAndDelete({ id_mayor: idLibroMayor });
}
// Funciona para modificar la cuenta ya en moongo
async function updateLibroMayorStore(idMayor, body) {
  return await model.findOneAndUpdate({ id_mayor: idMayor }, body, { new: true });
}

module.exports = {
  listLibroMayorSort,
  listLibroMayorSortOne,
  findLibroMayor,
  findLibroMayorOpcional,
  crearLibroMayor,
  removeLibroMayor,
  updateLibroMayorStore,
};
