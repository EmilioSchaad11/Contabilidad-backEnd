const store = require("../store/venta.store");

async function agregar(req, res) {
  try {
    const data = req.body;
    const venta = await store.agregarVenta(data);
    res.status(201).json({ success: true, venta });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function listar(req, res) {
  try {
    const ventas = await store.obtenerVentas();
    res.json({ success: true, ventas });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function eliminar(req, res) {
  try {
    await store.eliminarVenta(req.params.id);
    res.json({ success: true, message: "Venta eliminada" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = {
  agregar,
  listar,
  eliminar
};
