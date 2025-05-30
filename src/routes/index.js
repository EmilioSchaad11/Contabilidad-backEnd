const cuentas = require('./cuentas.network');
const factura = require('./factura.network');
const venta = require('./venta.network');
const balanceComprobacion = require('./balanceComprobacion.network');

const routes = (app) => {
  app.use('/cuentas', cuentas);
  app.use('/factura', factura);
  app.use('/ventas', venta);
  app.use('/balanceComprobacion', balanceComprobacion); // <--- ESTA LÍNEA ES CLAVE
};

module.exports = routes;
