const partidaiRoutes = require("./src/routes/partidaiRoutes");
const partidadRoutes = require("./src/routes/partidadRoutes");

const routes = (app) => {
  app.use("/partidais", partidaiRoutes);
  app.use("/partidas", partidadRoutes);
};

module.exports = routes;  
