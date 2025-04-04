/* Componentes */
const cuentas = require('./cuentas.network');

const routes = (app) => {
  app.use('/cuentas', cuentas);
};

module.exports = routes;