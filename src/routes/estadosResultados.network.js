const express = require('express');
const router = express.Router();
const { listarEstadosResultados, listaroneEstadosResultados, createEstadosResultados } = require('../controllers/estadosResultados.controller');

router.get('/', listarEstadosResultados);
router.get('/:idEstadoResultados', listaroneEstadosResultados);
router.post('/create', createEstadosResultados);
/*router.put('/update/:idCuenta', updateCuentas);
router.delete('/delete/:idCuenta', deleteCuentas); */
// router.get('/pdf', createPDF);
// router.get('/excel', createExcel);

module.exports = router;
