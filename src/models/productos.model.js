const sql = require('../config/database');

const Producto = function(producto) {
  this.nombre = producto.nombre;
  this.precio = producto.precio;
  this.stock = producto.stock;
};

Producto.obtenerTodos = (resultado) => {
  sql.query("SELECT * FROM productos", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(err, null);
      return;
    }
    resultado(null, res);
  });
};

Producto.obtenerPorId = (id, resultado) => {
  sql.query("SELECT * FROM productos WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(err, null);
      return;
    }
    if (res.length) {
      resultado(null, res[0]);
      return;
    }
    resultado({ tipo: "no_encontrado" }, null);
  });
};

Producto.crear = (nuevoProducto, resultado) => {
  sql.query("INSERT INTO productos SET ?", nuevoProducto, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(err, null);
      return;
    }
    resultado(null, { id: res.insertId, ...nuevoProducto });
  });
};

Producto.actualizar = (id, producto, resultado) => {
  sql.query(
    "UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?",
    [producto.nombre, producto.precio, producto.stock, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        resultado(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        resultado({ tipo: "no_encontrado" }, null);
        return;
      }
      resultado(null, { id: id, ...producto });
    }
  );
};

Producto.eliminar = (id, resultado) => {
  sql.query("DELETE FROM productos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      resultado(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      resultado({ tipo: "no_encontrado" }, null);
      return;
    }
    resultado(null, res);
  });
};

module.exports = Producto;