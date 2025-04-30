const store = require("../store/balance.store");

async function agregar(req, res) {
  try {
    const { cuenta, debito, credito, fecha } = req.body;

    if (!cuenta || (!debito && !credito)) {
      return res.status(400).json({
        success: false,
        message: "Debe proporcionar una cuenta y un valor en débito o crédito.",
      });
    }

    if (debito && credito) {
      return res.status(400).json({
        success: false,
        message: "Solo se puede tener un valor en débito o en crédito, no ambos.",
      });
    }

    const nuevoRegistro = await store.agregarRegistro({
      cuenta,
      debito: parseFloat(debito) || 0,
      credito: parseFloat(credito) || 0,
      fecha: new Date(fecha),
    });

    res.status(201).json({ success: true, registro: nuevoRegistro });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function listar(req, res) {
  try {
    const { fecha } = req.query;

    let filtro = {};
    if (fecha) {
      const inicio = new Date(fecha);
      const fin = new Date(fecha);
      fin.setHours(23, 59, 59, 999);
      filtro.fecha = { $gte: inicio, $lte: fin };
    }

    const registros = await store.obtenerRegistros(filtro);
    res.json({ success: true, registros });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

async function eliminar(req, res) {
  try {
    const { id } = req.params;

    const eliminado = await store.eliminarRegistro(id);
    if (!eliminado) {
      return res.status(404).json({ success: false, message: "Registro no encontrado." });
    }

    res.json({ success: true, message: "Registro eliminado correctamente." });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = {
  agregar,
  listar,
  eliminar,
};
