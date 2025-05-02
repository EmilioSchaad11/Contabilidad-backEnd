/* Importaciones de librarias internas */
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/index');
const cors = require('cors');

/* Funciones de app */
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
routes(app);

module.exports = app;
