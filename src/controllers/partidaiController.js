//partidaiController
const store = require("../store/partidaiStore");

async function listar(req, res) {
  try {
    const partidas = await store.obtenerPartidasI();
    res.json({ success: true, partidas });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function agregar(req, res) {
  try {
    const data = req.body;
    const partida = await store.agregarPartidaI(data);
    res.status(201).json({ success: true, partida }); // ← así devuelves una propiedad consistente
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function eliminar(req, res) {
  try {
    await store.eliminarPartidaI(req.params.id);
    res.json({ success: true, message: "Partida inicial eliminada" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = {
  listar,
  agregar,
  eliminar
};