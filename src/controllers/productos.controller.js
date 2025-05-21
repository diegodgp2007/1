const Producto = require('../models/productos.model');

exports.obtenerTodos = (req, res) => {
  Producto.obtenerTodos((err, productos) => {
    if (err) {
      res.status(500).json({
        mensaje: "Error al obtener los productos",
        error: err,
        data: []  // Aseguramos devolver un array vacío en caso de error
      });
    } else {
      res.json(Array.isArray(productos) ? productos : []); // Aseguramos devolver siempre un array
    }
  });
};

exports.obtenerPorId = (req, res) => {
  Producto.obtenerPorId(req.params.id, (err, producto) => {
    if (err) {
      res.status(500).send({
        mensaje: "Error al obtener el producto"
      });
    } else {
      res.send(producto);
    }
  });
};

exports.crear = (req, res) => {
  const nuevoProducto = new Producto({
    nombre: req.body.nombre,
    precio: req.body.precio,
    stock: req.body.stock
  });

  Producto.crear(nuevoProducto, (err, producto) => {
    if (err) {
      res.status(500).send({
        mensaje: "Error al crear el producto"
      });
    } else {
      res.send(producto);
    }
  });
};

exports.actualizar = (req, res) => {
  Producto.actualizar(req.params.id, new Producto(req.body), (err, producto) => {
    if (err) {
      res.status(500).send({
        mensaje: "Error al actualizar el producto"
      });
    } else {
      res.send(producto);
    }
  });
};

exports.eliminar = (req, res) => {
  Producto.eliminar(req.params.id, (err, resultado) => {
    if (err) {
      res.status(500).send({
        mensaje: "Error al eliminar el producto"
      });
    } else {
      res.send({ mensaje: "Producto eliminado exitosamente" });
    }
  });
};