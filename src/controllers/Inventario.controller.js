const { listAllInventarios, findInventario, createInventario, updateInventario, deleteInventario } = require('../store/Inventario.store');
const RESPONSE = require('../utils/response');

async function listarInventarios(req, res) {
  try {
    await listAllInventarios().then((resp)=> {
      console.log(resp);
      
      return RESPONSE.success(req, res, resp, 200);})
  } catch (error) {
    console.error(error);
    return RESPONSE.error(req, res, 'Error al listar inventarios', 500);
  }
}

async function listarUnInventario(req, res) {
  const { idInventario } = req.params;
  try {
    const inventario = await findInventario(idInventario);
    if (!inventario) return RESPONSE.error(req, res, 'Inventario no encontrado', 404);
    return RESPONSE.success(req, res, inventario, 200);
  } catch (error) {
    console.error(error);
    return RESPONSE.error(req, res, 'Error al obtener inventario', 500);
  }
}

async function crearInventario(req, res) {
  const { fecha, cantidad, monto, cuenta, descripcion, categoria } = req.body;

  try {
    // Obtener todos los inventarios y ordenar por id_inventario descendente
    const inventarios = await listAllInventarios();
    const sortedInventarios = inventarios.sort((a, b) => b.id_inventario - a.id_inventario);
    const lastInventario = sortedInventarios[0];

    // Si no hay inventarios, comenzamos con id_inventario = 1
    const idInventario = lastInventario ? lastInventario.id_inventario + 1 : 1;

    // Crear el nuevo inventario
    const newInventario = {
      id_inventario: idInventario,
      fecha,
      cantidad,
      monto,
      cuenta,
      descripcion,
      categoria
    };

    // Guardar el inventario
    const inventarioCreado = await createInventario(newInventario);
    return RESPONSE.success(req, res, inventarioCreado, 201);
  } catch (error) {
    console.error(error);
    return RESPONSE.error(req, res, 'Error al crear inventario', 500);
  }
}

async function modificarInventario(req, res) {
  const { idInventario } = req.params;
  const data = req.body;
  try {
    const inventario = await findInventario(idInventario);
    if (!inventario) return RESPONSE.error(req, res, 'Inventario no encontrado', 404);
    const inventarioActualizado = await updateInventario(idInventario, data);
    return RESPONSE.success(req, res, inventarioActualizado, 200);
  } catch (error) {
    console.error(error);
    return RESPONSE.error(req, res, 'Error al actualizar inventario', 500);
  }
}

async function eliminarInventario(req, res) {
  const { idInventario } = req.params;
  try {
    const inventario = await findInventario(idInventario);
    if (!inventario) return RESPONSE.error(req, res, 'Inventario no encontrado', 404);
    await deleteInventario(idInventario);
    return RESPONSE.success(req, res, 'Inventario eliminado con éxito', 200);
  } catch (error) {
    console.error(error);
    return RESPONSE.error(req, res, 'Error al eliminar inventario', 500);
  }
}

module.exports = {
  listarInventarios,
  listarUnInventario,
  crearInventario,
  modificarInventario,
  eliminarInventario
};
