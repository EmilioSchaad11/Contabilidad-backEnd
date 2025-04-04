const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/proyecto_contabilidad')


const objetodb = mongoose.connection

objetodb.on('connected', ()=>{console.log('Conexion correcta')})
objetodb.on('error', ()=>{console.log('Error en la conexion')})

module.exports = mongoose