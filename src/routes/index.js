/* Componentes */
const cuentas = require('./cuentas.network');
const partidai = require('./routes/partidaiRoutes');
const partidad = require("./routes/partidadRoutes");


const routes = (app) => {
  app.use('/cuentas', cuentas);
  app.use('/partidad', partidadRoutes);
  app.use('/partidai', partidaiRoutes);

};

module.exports = routes;