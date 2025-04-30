const Venta = require("../model/venta.model");

function agregarVenta(data) {
  const nueva = new Venta(data);
  return nueva.save();
}

function obtenerVentas() {
  return Venta.find().populate("facturas");
}

function eliminarVenta(id) {
  return Venta.findByIdAndDelete(id);
}

module.exports = {
  agregarVenta,
  obtenerVentas,
  eliminarVenta
};
