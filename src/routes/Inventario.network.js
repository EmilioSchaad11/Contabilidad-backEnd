const express = require('express');
const router = express.Router();
const { listarInventarios, listarUnInventario, crearInventario, modificarInventario, eliminarInventario } = require('../controllers/Inventario.controller');

// Rutas del inventario
router.get('/', listarInventarios);  // Listar todos los inventarios
router.get('/:idInventario', listarUnInventario);  // Listar un inventario por su ID
router.post('/', crearInventario);  // Crear un nuevo inventario
router.put('/:idInventario', modificarInventario);  // Actualizar un inventario por su ID
router.delete('/:idInventario', eliminarInventario);  // Eliminar un inventario por su ID

module.exports = router;
