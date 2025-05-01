/* Componentes */
const cuentas = require('./cuentas.network');
const Inventario = require('./Inventario.network');
const comprasServicios = require('./comprasServicios.network'); // 👈 Agregado

const routes = (app) => {
  app.use('/cuentas', cuentas);
  app.use('/Inventario', Inventario);
  app.use('/comprasServicios', comprasServicios); // 👈 Agregado
};

module.exports = routes;
