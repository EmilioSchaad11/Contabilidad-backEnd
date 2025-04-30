const express = require('express');
const router = express.Router();
const {
  listarFacturas,
  listarUnaFactura,
  crearFactura,
  modificarFactura,
  eliminarFactura

} = require('../controllers/Factura.controller');

router.get('/', listarFacturas);
router.get('/:idFactura', listarUnaFactura);
router.post('/create', crearFactura);
router.put('/:idFactura', modificarFactura);
router.delete('/:idFactura', eliminarFactura);

module.exports = router;