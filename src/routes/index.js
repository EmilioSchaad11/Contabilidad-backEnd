/* Componentes */
const cuentas = require('./cuentas.network');
const libroMayor = require('./libromayor.network');

const routes = (app) => {
  app.use('/cuentas', cuentas);
  app.use('/libromayor', libroMayor);
};

module.exports = routes;
