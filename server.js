require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const cuentaRoutes = require("./src/routes/cuentaRoutes");
const cuentaiRoutes = require("./src/routes/cuentaiRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/cuentas", cuentaRoutes);
app.use("/cuentai", cuentaiRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
