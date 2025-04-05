const model = require('../model/partidadiario.model');
const modelDetalle = require('../model/detallepartida_diario.model');

// Funcion para traer por codicion partidaDiario
async function listPartidaDiarioCondicion(condicion) {
  return await model.aggregate(condicion);
}
// Funciona para crear la cuenta ya en moongo
async function listDetallePartidaDiarioCondicion(condicion) {
  return await modelDetalle.aggregate(condicion);
}

module.exports = {
  listPartidaDiarioCondicion,
  listDetallePartidaDiarioCondicion,
};
