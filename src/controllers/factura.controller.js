
const {
    listAllFacturas,
    listFacturasSort,
    findFactura,
    createFactura,
    updateFactura,
    deleteFactura
  } = require('../store/factura.store');
  const RESPONSE = require('../utils/response');
  
  async function listarFacturas(req, res) {
    try {
      const facturas = await listAllFacturas();
      return RESPONSE.success(req, res, facturas, 200);
    } catch (error) {
      console.error(error);
      return RESPONSE.error(req, res, 'Error al listar facturas', 500);
    }
  }
  
  async function listarUnaFactura(req, res) {
    const { idFactura } = req.params;
    try {
      const factura = await findFactura(idFactura);
      if (!factura) return RESPONSE.error(req, res, 'Factura no encontrada', 404);
      return RESPONSE.success(req, res, factura, 200);
    } catch (error) {
      console.error(error);
      return RESPONSE.error(req, res, 'Error interno', 500);
    }
  }
  
  async function crearFactura(req, res) {
    const { descripcion, fecha, precio_neto, monto_iva, importe_total } = req.body;
  
    try {
      const lastFactura = await listFacturasSort();
      const nuevaFactura = {
        id_factura: lastFactura ? lastFactura.id_factura + 1 : 1,
        descripcion,
        fecha,
        precio_neto,
        monto_iva,
        importe_total
      };
  
      const facturaCreada = await createFactura(nuevaFactura);
      return RESPONSE.success(req, res, facturaCreada, 201);
    } catch (error) {
      console.error(error);
      return RESPONSE.error(req, res, 'Error al crear factura', 500);
    }
  }
  
  async function modificarFactura(req, res) {
    const { idFactura } = req.params;
    const data = req.body;
  
    try {
      const factura = await findFactura(idFactura);
      if (!factura) return RESPONSE.error(req, res, 'Factura no encontrada', 404);
  
      const facturaActualizada = await updateFactura(idFactura, data);
      return RESPONSE.success(req, res, facturaActualizada, 200);
    } catch (error) {
      console.error(error);
      return RESPONSE.error(req, res, 'Error al actualizar factura', 500);
    }
  }
  
  async function eliminarFactura(req, res) {
    const { idFactura } = req.params;
  
    try {
      const factura = await findFactura(idFactura);
      if (!factura) return RESPONSE.error(req, res, 'Factura no encontrada', 404);
  
      await deleteFactura(idFactura);
      return RESPONSE.success(req, res, 'Factura eliminada con éxito', 200);
    } catch (error) {
      console.error(error);
      return RESPONSE.error(req, res, 'Error al eliminar factura', 500);
    }
  }
  
  module.exports = {
    listarFacturas,
    listarUnaFactura,
    crearFactura,
    modificarFactura,
    eliminarFactura
  };