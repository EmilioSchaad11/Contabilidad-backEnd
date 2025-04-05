/* Componentes */
const cuentas = require('./cuentas.network');
const factura = require('./factura.network');

const routes = (app) => {
  app.use('/cuentas', cuentas);
  app.use('/factura', factura);
};

module.exports = routes;