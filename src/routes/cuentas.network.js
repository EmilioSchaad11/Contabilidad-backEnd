const express = require('express');
const router = express.Router();
const { listarCuentas, createCuentas, updateCuentas, deleteCuentas, listarOneCuenta } = require('../controllers/cuentas.controller');

router.get('/', listarCuentas);
router.get('/:idCuenta', listarOneCuenta);
router.post('/create', createCuentas);
router.put('/update/:idCuenta', updateCuentas);
router.delete('/delete/:idCuenta', deleteCuentas);
// router.get('/pdf', createPDF);
// router.get('/excel', createExcel);

module.exports = router;
