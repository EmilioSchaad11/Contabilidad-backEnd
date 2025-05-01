const mongoose = require('mongoose');
const Inventario = require('../model/Inventario.model'); // Asegúrate de tener este modelo en el directorio adecuado

// Función para listar todos los inventarios
async function listAllInventarios() {
  return await Inventario.find({});
}

// Función para encontrar un inventario por su ID
async function findInventario(idInventario) {
  return await Inventario.findById(idInventario);
}

// Función para crear un nuevo inventario
async function createInventario(inventario) {
  const newInventario = new Inventario(inventario);
  return await newInventario.save();
}

// Función para actualizar un inventario por su ID
async function updateInventario(idInventario, data) {
  return await Inventario.findByIdAndUpdate(idInventario, data, { new: true });
}

// Función para eliminar un inventario por su ID
async function deleteInventario(idInventario) {
  return await Inventario.findByIdAndDelete(idInventario);
}

module.exports = {
  listAllInventarios,
  findInventario,
  createInventario,
  updateInventario,
  deleteInventario
};
