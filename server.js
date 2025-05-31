const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/proyecto_contabilidad').then(() => {
  const PORT = 3500;
  app.listen(PORT, () => console.log(`Escuchando http://localhost:${PORT}`));
});
