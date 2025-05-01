const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;


mongoose.connect('mongodb://127.0.0.1:27017/Proyecto_Contabilidad').then(() => {
  const PORT = 3500;
  app.listen(PORT, () => console.log(`Escuchando http://localhost:${PORT}`));
});