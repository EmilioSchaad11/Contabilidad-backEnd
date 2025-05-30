const store = require("../store/balanceComprobacion.store");

async function agregar(req, res) {
  try {
    const { fecha, registros } = req.body;

    if (!fecha || !Array.isArray(registros) || registros.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Debe proporcionar una fecha y al menos un registro.",
      });
    }

    // Validar cada registro
    for (const r of registros) {
      if (!r.cuenta || (r.debito == null && r.credito == null)) {
        return res.status(400).json({
          success: false,
          message: "Cada registro debe tener una cuenta y un valor en débito o crédito.",
        });
      }

      if (r.debito && r.credito) {
        return res.status(400).json({
          success: false,
          message: "Cada registro solo debe tener débito o crédito, no ambos.",
        });
      }
    }

    // Guardar todos los registros
    const resultados = await Promise.all(
      registros.map(async (r) => {
        return await store.agregarRegistro({
          cuenta: r.cuenta,
          debito: parseFloat(r.debito) || 0,
          credito: parseFloat(r.credito) || 0,
          fecha: new Date(fecha),
        });
      })
    );

    res.status(201).json({
      success: true,
      mensaje: "Registros guardados correctamente.",
      registros: resultados,
    });

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
