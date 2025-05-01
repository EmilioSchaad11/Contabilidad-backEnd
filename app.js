const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index'); // Asegúrate que la ruta sea correcta
const app = express();

app.use(express.json());
app.use(cors());

// Cargar las rutas centralizadas
routes(app);

module.exports = app
