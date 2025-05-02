/* Componentes */
const cuentas = require('./cuentas.network');
const libroMayor = require('./libromayor.network');
const comprasServicios = require('./comprasServicios.network');
const Inventario = require('./Inventario.network');

const routes = (app) => {
  app.use('/cuentas', cuentas);
  app.use('/libromayor', libroMayor);
  app.use('/cuentas', cuentas);
  app.use('/Inventario', Inventario);
  app.use('/comprasServicios', comprasServicios);
};

module.exports = routes;
