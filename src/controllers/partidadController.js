const store = require("../store/partidadStore");

async function listar(req, res) {
  try {
    const partidas = await store.obtenerPartidasd();
    res.json({ success: true, partidas });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function agregar(req, res) {
  try {
    const data = req.body;
    const partida = await store.agregarPartidad(data);
    res.status(201).json(partida);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function eliminar(req, res) {
  try {
    await store.eliminarPartidad(req.params.id);
    res.json({ success: true, message: "Partida diario eliminada" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = {
  listar,
  agregar,
  eliminar
};