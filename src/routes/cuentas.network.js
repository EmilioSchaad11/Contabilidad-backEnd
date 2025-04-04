const express = require('express');
const router = express.Router();
const { listarCuentas, createCuentas, updateCuentas } = require('../controllers/cuentas.controller');

router.get('/', listarCuentas);
router.post('/create', createCuentas);
router.put('/update/:idCuenta', updateCuentas);
// router.get('/pdf', createPDF);
// router.get('/excel', createExcel);
// router.put('/update/me/:idEmpresa', updateMe);
// router.delete('/delete/:idEmpleado', deleteEmpleado);

module.exports = router;
