require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const partidaiRoutes = require("./src/routes/partidaiRoutes");
const partidadRoutes = require("./src/routes/partidadRoutes");

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/partidais", partidaiRoutes);
app.use("/partidas", partidadRoutes);


// Servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto${PORT}`);
});