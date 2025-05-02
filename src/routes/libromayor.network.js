const express = require('express');
const router = express.Router();
const { listarAllLibroMayor, listarOneLibroMayor, crearLibromayor, deleteLibroMayor, updateLibroMayor } = require('../controllers/libromayor.controller');

router.get('/', listarAllLibroMayor);
router.get('/:idMayor', listarOneLibroMayor);
router.post('/create', crearLibromayor);
router.put('/update/:idMayor', updateLibroMayor);
router.delete('/delete/:idMayor', deleteLibroMayor);
// router.get('/pdf', createPDF);
// router.get('/excel', createExcel);

module.exports = router;
