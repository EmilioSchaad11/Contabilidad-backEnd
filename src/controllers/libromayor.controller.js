const { updateLibroMayorStore, listLibroMayorSort, findLibroMayor, crearLibroMayor, findLibroMayorOpcional, listLibroMayorSortOne, removeLibroMayor } = require('../store/libromayor.store');
const { listDetallePartidaDiarioCondicion, listPartidaDiarioCondicion } = require('../store/partidadiario.store');
const RESPONSE = require('../utils/response');

// Listar todos los libros mayores.
async function listarAllLibroMayor(req, res) {
  await listLibroMayorSort()
    .then((libroMayorEncontrados) => {
      libroMayorEncontrados = libroMayorEncontrados.filter((libMayor) => libMayor.id_cuenta !== null);
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

// En libromayor.controller.js, reemplaza únicamente la función updateLibroMayor por lo siguiente:

// En libromayor.controller.js, reemplaza únicamente la función updateLibroMayor por lo siguiente:

async function updateLibroMayor(req, res) {
  const idMayor = req.params.idMayor;

  try {
    // 1) Primero buscamos el LibroMayor existente:
    const libroExistente = await findLibroMayor(idMayor);
    if (!libroExistente) {
      return RESPONSE.error(req, res, 'Libro Mayor no encontrado para actualizar.', 404);
    }

    // 2) Extraemos id_cuenta, fecha_inicio y fecha_fin del registro existente:
    //    (Nota: cuando se usó populate, id_cuenta viene como objeto con la info de la cuenta.
    //     Pero en el store/model original, id_cuenta es un número. Por eso hacemos este chequeo.)
    let id_cuenta;
    if (libroExistente.id_cuenta && typeof libroExistente.id_cuenta === 'object') {
      // Si viene poblado (populate), asumimos que el subdocumento tiene un campo numérico "id_cuenta"
      id_cuenta = libroExistente.id_cuenta.id_cuenta || libroExistente.id_cuenta;
    } else {
      // Si no está poblado, tomamos el valor directamente
      id_cuenta = libroExistente.id_cuenta;
    }

    const fecha_inicio = libroExistente.fecha_inicio;
    const fecha_fin = libroExistente.fecha_fin;

    // 3) Volvemos a ejecutar la agregación para obtener todos los movimientos dentro del rango:
    const movimientosResp = await listDetallePartidaDiarioCondicion([
      {
        $match: {
          id_cuenta: id_cuenta,
        },
      },
      {
        $lookup: {
          from: 'partida_diario',
          localField: 'id_partidaDiario',
          foreignField: 'id_partidaDiario',
          let: {
            fechaInicio: fecha_inicio,
            fechaFin: fecha_fin,
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    {
                      $and: [{ $gte: ['$Fecha', '$$fechaInicio'] }, { $lte: ['$Fecha', '$$fechaFin'] }],
                    },
                    { $eq: ['$Fecha', null] },
                  ],
                },
              },
            },
          ],
          as: 'partidaDiarioInfo',
        },
      },
      {
        $match: {
          'partidaDiarioInfo.0': { $exists: true },
        },
      },
      {
        $project: {
          id_partidaDiario: 1,
          Debe: 1,
          Haber: 1,
          id_cuenta: 1,
        },
      },
    ]);

    // 4) Obtenemos el último id_mayor existente (para asignar uno nuevo si fuera “create”,
    //    pero en update no lo usamos; lo sacamos solo para preservar la lógica):
    const ultimoMayor = await listLibroMayorSortOne();

    // 5) Creamos el objeto “modeloActualizado” con la misma estructura que usaría crearLibromayor:
    const modeloActualizado = {
      id_mayor: libroExistente.id_mayor, // mantenemos el mismo
      id_cuenta: id_cuenta,
      fecha_inicio,
      fecha_fin,
      saldo_inicial: 0,
      saldo_final: 0,
      movimientos: [],
    };

    // 6) Calculamos el saldo inicial basado en cualquier libro previo a este rango:
    const libroPrevio = await findLibroMayorOpcional({
      id_cuenta: id_cuenta,
      fecha_fin: { $lt: fecha_inicio },
    });
    if (libroPrevio && typeof libroPrevio.saldo_final === 'number') {
      modeloActualizado.saldo_inicial = libroPrevio.saldo_final;
    } else {
      modeloActualizado.saldo_inicial = 0;
    }

    // 7) Recorremos “movimientosResp” para armar el array de movimientos y sumar débitos/créditos:
    let sumaDebito = 0;
    let sumaCredito = 0;

    for (const registro of movimientosResp) {
      // Obtenemos información detallada de la partidaDiario para tomar fecha y descripción:
      const detallePartida = await listPartidaDiarioCondicion([{ $match: { id_partidaDiario: registro.id_partidaDiario } }]).then((r) => r[0] || null);

      // Si no encontramos el detalle de partida, lo saltamos:
      if (!detallePartida) continue;

      const objMovimiento = {
        fecha: detallePartida.Fecha || null,
        descripcion: detallePartida.Descripcion || '',
        debito: Number(registro.Debe) || 0,
        credito: Number(registro.Haber) || 0,
      };

      sumaDebito += objMovimiento.debito;
      sumaCredito += objMovimiento.credito;
      modeloActualizado.movimientos.push(objMovimiento);
    }

    // 8) Calculamos el saldo_final:
    //    saldo_final = saldo_inicial + (sumaDebito - sumaCredito)
    modeloActualizado.saldo_final = modeloActualizado.saldo_inicial + (sumaDebito - sumaCredito);

    // 9) Validamos que saldo_final efectivamente sea un número:
    if (typeof modeloActualizado.saldo_final !== 'number' || isNaN(modeloActualizado.saldo_final)) {
      modeloActualizado.saldo_final = 0;
    }

    // 10) Ejecutamos el update en MongoDB:
    const mayorModificado = await updateLibroMayorStore(idMayor, modeloActualizado);
    if (!mayorModificado) {
      return RESPONSE.error(req, res, 'No se pudo actualizar el Libro Mayor.', 500);
    }

    return RESPONSE.success(req, res, mayorModificado, 200);
  } catch (err) {
    console.log('Error en updateLibroMayor:', err);
    return RESPONSE.error(req, res, 'Error interno', 500);
  }
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
