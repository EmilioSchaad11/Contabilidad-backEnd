const { listAllEstadosResultados, findEstadosResultados, listEstadosResultadosSort, createEstadosResultadosNew } = require('../store/estadosResultados.store');
const { ventasAgreggate } = require('../store/venta.store');
const { extraciondemovimientosAggregate } = require('../store/libromayor.store');
const { listAllCuentas } = require('../store/cuentas.store');
const RESPONSE = require('../utils/response');

async function listarEstadosResultados(req, res) {
  await listAllEstadosResultados()
    .then((EsResultEncontradas) => {
      return RESPONSE.success(req, res, EsResultEncontradas, 200);
    })
    .catch((err) => {
      console.log('Error', err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}
async function listaroneEstadosResultados(req, res) {
  const idEstadoResultados = req.params.idEstadoResultados;
  findEstadosResultados(idEstadoResultados)
    .then((EsResultncontradas) => {
      let response = [];
      if (EsResultncontradas != null) {
        response = EsResultncontradas;
      }
      return RESPONSE.success(req, res, response, 200);
    })
    .catch((err) => {
      console.log('Error', err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}

async function createEstadosResultados(req, res) {
  const { fecha_inicio, fecha_fin } = req.body;

  const inicioISO = new Date(fecha_inicio);
  const finISO = new Date(fecha_fin);

  // Id de gastos
  const gastosIdsTotales = [];
  await listAllCuentas({ tipo: { $regex: /^gastos$/i } }, { _id: 1, nombre: 1, id_cuenta: 1 })
    .then((result) => {
      result.forEach((cuenta) => {
        gastosIdsTotales.push(cuenta['id_cuenta']);
      });
    })
    .catch((err) => {
      console.log('Error', err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
  console.log({ gastosIdsTotales });

  // Ids de ingresos
  const ingresosIdsTotales = [];
  await listAllCuentas({ tipo: { $regex: /^ingreso$/i } }, { _id: 1, nombre: 1, id_cuenta: 1 })
    .then((result) => {
      result.forEach((cuenta) => {
        ingresosIdsTotales.push(cuenta['id_cuenta']);
      });
    })
    .catch((err) => {
      console.log('Error', err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
  console.log({ ingresosIdsTotales });

  /*
  ingresos_totales: { type: Number, require: true },
  gastos_totales: { type: Number, require: true },
  utilidad_neta: { type: Number, require: true }
}); */

  const resultadosDebeHaber = extraciondemovimientosAggregate([
    // 1) Desplegamos todos los movimientos y luego filtramos por rango de fechas:
    { $unwind: '$movimientos' },
    {
      $match: {
        'movimientos.fecha': {
          $gte: inicioISO,
          $lte: finISO,
        },
      },
    },

    // 2) Ahora usamos $facet para calcular en paralelo:
    {
      $facet: {
        ingresos: [
          // a) Filtrar sólo aquellos movimientos cuya cuenta esté en ingresosIds:
          { $match: { id_cuentas: { $in: ingresosIdsTotales } } },
          // b) Agrupar y sumar haber:
          {
            $group: {
              _id: null,
              totalIngresos: { $sum: '$movimientos.haber' },
            },
          },
        ],
        gastos: [
          // a) Filtrar sólo aquellos movimientos cuya cuenta esté en gastosIds:
          { $match: { id_cuentas: { $in: gastosIdsTotales } } },
          // b) Agrupar y sumar debe:
          {
            $group: {
              _id: null,
              totalGastos: { $sum: '$movimientos.debe' },
            },
          },
        ],
      },
    },
  ])
    .then((result) => {
      console.log({ result });
    })
    .catch((err) => {
      console.log('Error', err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });

  return;

  const EstadoResultados = {
    id_resultados: getLastItem == null ? 1 : getLastItem.id_resultados + 1,
    fecha_inicio,
    fecha_fin,
    id_cuenta,
  };

  createEstadosResultadosNew(EstadoResultados)
    .then((EstadoResultadosCreada) => {
      return RESPONSE.success(req, res, EstadoResultadosCreada, 201);
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
  listarEstadosResultados,
  listaroneEstadosResultados,
  createEstadosResultados,
};
