const sql = require('../config/database');

const Usuario = function(usuario) {
    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this.password = usuario.password;
};

Usuario.obtenerTodos = (resultado) => {
    sql.query("SELECT * FROM usuarios", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            resultado(err, null);
            return;
        }
        resultado(null, res);
    });
};

Usuario.obtenerPorId = (id, resultado) => {
    sql.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, res) => {
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

module.exports = Usuario;