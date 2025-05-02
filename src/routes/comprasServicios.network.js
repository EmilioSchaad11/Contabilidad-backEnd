const express = require('express');
const router = express.Router();
const {
  listarCompras,
  listarOneCompra,
  createCompra,
  actualizarCompra,
  eliminarCompra
} = require('../controllers/comprasServicios.controller');

// Rutas del comprasServicios
router.get('/', listarCompras);  // Listar todas las compras
router.get('/:idCompra', listarOneCompra);  // Listar una compra por su ID
router.post('/', createCompra);  // Crear una nueva compra
router.put('/:idCompra', actualizarCompra);  // Actualizar una compra por su ID
router.delete('/:idCompra', eliminarCompra);  // Eliminar una compra por su ID

module.exports = router;
