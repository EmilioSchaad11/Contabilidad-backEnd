const { updateLibroMayorStore, listLibroMayorSort, findLibroMayor, crearLibroMayor, findLibroMayorOpcional, listLibroMayorSortOne, removeLibroMayor } = require('../store/libromayor.store');
const { listDetallePartidaDiarioCondicion, listPartidaDiarioCondicion } = require('../store/partidadiario.store');
const RESPONSE = require('../utils/response');

// Listar todos los libros mayores.
async function listarAllLibroMayor(req, res) {
  await listLibroMayorSort()
    .then((libroMayorEncontrados) => {
      return RESPONSE.success(req, res, libroMayorEncontrados, 200);
    })
    .catch((err) => {
      console.log('Error', err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}
// Encontrar solo un libro mayor
async function listarOneLibroMayor(req, res) {
  const idMayor = req.params.idMayor;
  findLibroMayor(idMayor)
    .then((libroMayorEncontradas) => {
      let response = [];
      if (libroMayorEncontradas != null) {
        response = libroMayorEncontradas;
      }
      return RESPONSE.success(req, res, response, 200);
    })
    .catch((err) => {
      console.log('Error', err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}
// Crear libro mayor.
async function crearLibromayor(req, res, isUpdate = false) {
  const { id_cuenta, fecha_inicio, fecha_fin } = req.body;

  // Validar fechas
  const fechaInicio = new Date(fecha_inicio);
  const fechaFin = new Date(fecha_fin);

  if (isNaN(fechaInicio) || isNaN(fechaFin)) {
    return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
  }

  let modelLibroMayorUpdate = {};

  await listDetallePartidaDiarioCondicion([
    {
      $match: {
        id_cuenta: id_cuenta,
      },
    },
    // Paso 2: Buscar en partida_diario los id_partidaDiario que cumplan con las fechas
    {
      $lookup: {
        from: 'partida_diario', // Nombre de la colección
        localField: 'id_partidaDiario',
        foreignField: 'id_partidaDiario',
        let: { fechaInicio: new Date(fecha_inicio), fechaFin: new Date(fecha_fin) },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  // Fecha está dentro del rango
                  {
                    $and: [{ $gte: ['$Fecha', '$$fechaInicio'] }, { $lte: ['$Fecha', '$$fechaFin'] }],
                  },
                  // Fecha no existe
                  { $eq: ['$Fecha', null] },
                ],
              },
            },
          },
        ],
        as: 'partidaDiarioInfo',
      },
    },
    // Paso 3: Filtrar solo los documentos con coincidencia en partida_diario
    {
      $match: {
        'partidaDiarioInfo.0': { $exists: true }, // 👈 Solo si hay al menos un match
      },
    },
    // Paso 4: Proyectar los campos necesarios (opcional)
    {
      $project: {
        id_partidaDiario: 1,
        Debe: 1,
        Haber: 1,
        id_cuenta: 1,
      },
    },
  ])
    .then(async (resp) => {
      const getLastItem = await listLibroMayorSortOne()
        .then((result) => result)
        .catch((err) => {
          console.log('Error', err);
          return RESPONSE.error(req, res, 'Error interno', 500);
        });

      const modelLibroMayor = {
        id_mayor: getLastItem == null ? 1 : getLastItem.id_mayor + 1,
        id_cuenta,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        saldo_inicial: 0,
        saldo_final: 0,
        movimientos: [],
      };

      let debitoSuma = 0;
      let creditoSuma = 0;

      for (let elements = 0; elements < resp.length; elements++) {
        const el = resp[elements];
        const dataPartido_diario = await listPartidaDiarioCondicion([{ $match: { id_partidaDiario: el.id_partidaDiario } }]).then((r) => {
          return r;
        });

        let movimientoEL = {
          fecha: null,
          descripcion: '',
          debito: 0,
          credito: 0,
        };

        movimientoEL.debito = el.Debe;
        debitoSuma = Number(debitoSuma) + Number(el.Debe);
        movimientoEL.credito = el.Haber;
        creditoSuma = Number(creditoSuma) + Number(el.Haber);
        movimientoEL.fecha = dataPartido_diario[0].Fecha;
        movimientoEL.descripcion = dataPartido_diario[0].Descripcion;

        modelLibroMayor.movimientos.push(movimientoEL);
      }

      let librosMayoresCreados = await findLibroMayorOpcional({
        id_cuenta, // Filtra por id_cuenta: 6
        fecha_fin: { $lt: fechaInicio }, // Fecha fin anterior a 2025-08-01
      });

      if (librosMayoresCreados !== null) {
        modelLibroMayor.saldo_inicial = librosMayoresCreados.saldo_final;
      }

      modelLibroMayor.saldo_final = modelLibroMayor.saldo_inicial + (debitoSuma - creditoSuma);
      if (isUpdate == true) {
        modelLibroMayorUpdate = modelLibroMayor;
        return true;
      }

      await crearLibroMayor(modelLibroMayor)
        .then((mayorCreado) => {
          return RESPONSE.success(req, res, mayorCreado, 201);
        })
        .catch((err) => {
          console.log(err);
          return RESPONSE.error(req, res, 'Error interno', 500);
        });
    })
    .catch((err) => {
      console.log('Error', err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });

  if (isUpdate) {
    return modelLibroMayorUpdate;
  }
}

async function updateLibroMayor(req, res) {
  const idMayor = req.params.idMayor;
  let nn = crearLibromayor(req, res, true)
    .then(async (result) => {
      delete result.id_mayor;
      await updateLibroMayorStore(idMayor, result)
        .then((mayorModificada) => RESPONSE.success(req, res, mayorModificada, 200))
        .catch((err) => {
          console.log(err);
          RESPONSE.error(req, res, 'Error a la hora de encontrar cuenta', 500);
        });
    })
    .catch((err) => {
      console.log(err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });

  return;
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

async function deleteLibroMayor(req, res) {
  const idMayor = req.params.idMayor;

  findLibroMayor(idMayor)
    .then((libroMayorEncontrado) => {
      if (libroMayorEncontrado) {
        removeLibroMayor(idMayor)
          .then(() => {
            return RESPONSE.success(req, res, 'Libro Mayor eliminado con exito!!', 200);
          })
          .catch((err) => {
            console.log(err);
            return RESPONSE.error(req, res, 'Error interno', 500);
          });
      } else {
        return RESPONSE.error(req, res, 'Libro Mayor no existente. ', 404);
      }
    })
    .catch((err) => {
      console.log(err);
      return RESPONSE.error(req, res, 'Error interno', 500);
    });
}

module.exports = {
  listarAllLibroMayor,
  listarOneLibroMayor,
  crearLibromayor,
  deleteLibroMayor,
  updateLibroMayor,
};
