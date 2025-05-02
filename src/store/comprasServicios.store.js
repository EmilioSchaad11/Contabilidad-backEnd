const model = require('../model/comprasServicios.model');

async function listAllCompras() {
  return await model.find({});
}

async function listComprasSort() {
  return await model.findOne({}).sort({ id_compra: -1 });
}

async function findCompras(idCompra) {
  return await model.findOne({ id_compra: idCompra });
}

async function createComprasNew(compra) {
  const newCompra = new model(compra);
  return await newCompra.save();
}

async function updateCompras(idCompra, body) {
  return await model.findOneAndUpdate({ id_compra: idCompra }, body, { new: true });
}

async function removeCompra(idCompra) {
  return await model.findOneAndDelete({ id_compra: idCompra });
}

module.exports = {
  listAllCompras,
  listComprasSort,
  findCompras,
  createComprasNew,
  updateCompras,
  removeCompra,
};
