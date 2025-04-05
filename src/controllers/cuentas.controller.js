const { listAllCuentas, listCuentasSort, createCuentasNew, findCuentas, updataCuentas, removecuenta } = require('../store/cuentas.store');
const RESPONSE = require('../utils/response');

async function listarCuentas(req, res) {
  await listAllCuentas()
    .then((cuentasEncontradas) => {
      return RESPONSE.success(req, res, cuentasEncontradas, 200);
    })
    .catch((err) => {
      console.log('Error', err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}
async function listarOneCuenta(req, res) {
  const idCuenta = req.params.idCuenta;
  findCuentas(idCuenta)
    .then((cuentasEncontradas) => {
      let response = [];
      if (cuentasEncontradas != null) {
        response = cuentasEncontradas;
      }
      return RESPONSE.success(req, res, response, 200);
    })
    .catch((err) => {
      console.log('Error', err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}

async function createCuentas(req, res) {
  const { nombre, tipo } = req.body;

  const getLastItem = await listCuentasSort()
    .then((result) => result)
    .catch((err) => {
      console.log('Error', err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });

  const cuenta = {
    nombre,
    tipo,
    id_cuenta: getLastItem == null ? 1 : getLastItem.id_cuenta + 1,
  };

  createCuentasNew(cuenta)
    .then((cuentaCreada) => {
      return RESPONSE.success(req, res, cuentaCreada, 201);
    })
    .catch((err) => {
      console.log(err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}

async function updateCuentas(req, res) {
  const idCuenta = req.params.idCuenta;
  findCuentas(idCuenta)
    .then((cuentaEncontrada) => {
      if (!cuentaEncontrada) {
        return RESPONSE.error(req, res, 'Cuenta no encontrada', 404);
      } else {
        const parametros = req.body;
        updataCuentas(idCuenta, parametros)
          .then((cuentaModificada) => RESPONSE.success(req, res, cuentaModificada, 200))
          .catch((err) => {
            console.log(err);
            RESPONSE.error(req, res, 'Error a la hora de encontrar cuenta', 500);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return RESPONSE.error(req, res, 'Error en la busqueda');
    });
}

async function deleteCuentas(req, res) {
  const idCuenta = req.params.idCuenta;

  findCuentas(idCuenta)
    .then((cuentaEmpleada) => {
      if (cuentaEmpleada) {
        removecuenta(idCuenta)
          .then((data) => {
            return RESPONSE.success(req, res, 'Cuenta eliminado con exito!!', 200);
          })
          .catch((err) => {
            console.log(err);
            return RESPONSE.error(req, res, 'Error interno', 500);
          });
      } else {
        return RESPONSE.error(req, res, 'Cuenta no existente. ', 404);
      }
    })
    .catch((err) => {
      console.log(err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}

module.exports = {
  listarCuentas,
  listarOneCuenta,
  createCuentas,
  updateCuentas,
  deleteCuentas,
};
