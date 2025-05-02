const { listAllCompras, listComprasSort, createComprasNew, findCompras, updateCompras, removeCompra } = require('../store/comprasServicios.store');
const RESPONSE = require('../utils/response');

async function listarCompras(req, res) {
  listAllCompras()
    .then((compras) => RESPONSE.success(req, res, compras, 200))
    .catch((err) => {
      console.log(err);
      RESPONSE.error(req, res, 'Error interno', 500);
    });
}

async function listarOneCompra(req, res) {
  const idCompra = req.params.idCompra;
  findCompras(idCompra)
    .then((compra) => {
      return RESPONSE.success(req, res, compra || [], 200);
    })
    .catch((err) => {
      console.log(err);
      RESPONSE.error(req, res, 'Error interno', 500);
    });
}

async function createCompra(req, res) {
  const { nombre, proveedor, monto } = req.body;

  const lastCompra = await listComprasSort().catch((err) => {
    console.log(err);
    return RESPONSE.error(req, res, 'Error interno', 500);
  });

  const compra = {
    nombre,
    proveedor,
    monto,
    id_compra: !lastCompra ? 1 : lastCompra.id_compra + 1
  };

  createComprasNew(compra)
    .then((compraCreada) => RESPONSE.success(req, res, compraCreada, 201))
    .catch((err) => {
      console.log(err);
      RESPONSE.error(req, res, 'Error interno', 500);
    });
}

async function actualizarCompra(req, res) {
  const idCompra = req.params.idCompra;
  findCompras(idCompra)
    .then((compra) => {
      if (!compra) return RESPONSE.error(req, res, 'Compra no encontrada', 404);

      updateCompras(idCompra, req.body)
        .then((modificada) => RESPONSE.success(req, res, modificada, 200))
        .catch((err) => {
          console.log(err);
          RESPONSE.error(req, res, 'Error al actualizar', 500);
        });
    })
    .catch((err) => {
      console.log(err);
      RESPONSE.error(req, res, 'Error interno', 500);
    });
}

async function eliminarCompra(req, res) {
  const idCompra = req.params.idCompra;

  findCompras(idCompra)
    .then((compra) => {
      if (!compra) return RESPONSE.error(req, res, 'Compra no encontrada', 404);

      removeCompra(idCompra)
        .then(() => RESPONSE.success(req, res, 'Compra eliminada correctamente', 200))
        .catch((err) => {
          console.log(err);
          RESPONSE.error(req, res, 'Error interno', 500);
        });
    })
    .catch((err) => {
      console.log(err);
      RESPONSE.error(req, res, 'Error interno', 500);
    });
}

module.exports = {
  listarCompras,
  listarOneCompra,
  createCompra,
  actualizarCompra,
  eliminarCompra,
};

