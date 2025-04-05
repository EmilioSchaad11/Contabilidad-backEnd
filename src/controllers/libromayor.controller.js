const { listLibroMayorSort, crearLibroMayor } = require('../store/libromayor.store');
const { listDetallePartidaDiarioCondicion, listPartidaDiarioCondicion } = require('../store/partidadiario.store');
const RESPONSE = require('../utils/response');

async function crearLibromayor(req, res) {
  const { id_cuenta, fecha_inicio, fecha_fin } = req.body;

  // Validar fechas
  const fechaInicio = new Date(fecha_inicio);
  const fechaFin = new Date(fecha_fin);

  if (isNaN(fechaInicio) || isNaN(fechaFin)) {
    return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD' });
  }

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
      // console.log(resp);
      const getLastItem = await listLibroMayorSort()
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
        movimientoEL.credito = el.Haber;
        movimientoEL.fecha = dataPartido_diario[0].Fecha;
        movimientoEL.descripcion = dataPartido_diario[0].Descripcion;

        modelLibroMayor.movimientos.push(movimientoEL);
      }

      // console.log(modelLibroMayor);
      await crearLibroMayor(modelLibroMayor)
        .then((cuentaCreada) => {
          return RESPONSE.success(req, res, cuentaCreada, 201);
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
}

module.exports = {
  crearLibromayor,
};
