const express = require('express');
const router = express.Router();
const { crearLibromayor } = require('../controllers/libromayor.controller');

// router.get('/', listarCuentas);
// router.get('/:idCuenta', listarOneCuenta);
router.post('/create', crearLibromayor);
// router.put('/update/:idCuenta', updateCuentas);
// router.delete('/delete/:idCuenta', deleteCuentas);
// router.get('/pdf', createPDF);
// router.get('/excel', createExcel);

module.exports = router;
