const model = require('../model/Factura.model');


// Listar todas las facturas
async function listAllFacturas() {
  return await model.find({});
}

// Obtener la factura con el id_factura más alto
async function listFacturasSort() {
  return await model.findOne({}).sort({ id_factura: -1 });
}

// Buscar una factura por id_factura
async function findFactura(idFactura) {
  return await model.findOne({ id_factura: idFactura });
}

// Crear una nueva factura
async function createFactura(factura) {
  const newFactura = new model(factura);
  return await newFactura.save();
}

// Actualizar una factura existente
async function updateFactura(idFactura, body) {
  return await model.findOneAndUpdate({ id_factura: idFactura }, body, { new: true });
}

// Eliminar una factura
async function deleteFactura(idFactura) {
  return await model.findOneAndDelete({ id_factura: idFactura });
}

module.exports = {
  listAllFacturas,
  listFacturasSort,
  findFactura,
  createFactura,
  updateFactura,
  deleteFactura,
};
