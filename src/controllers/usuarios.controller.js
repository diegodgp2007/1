const Usuario = require('../models/usuarios.model');

exports.obtenerTodos = (req, res) => {
    Usuario.obtenerTodos((err, usuarios) => {
        if (err) {
            res.status(500).json({
                mensaje: "Error al obtener los usuarios",
                error: err,
                data: []
            });
        } else {
            res.json(Array.isArray(usuarios) ? usuarios : []);
        }
    });
};

exports.obtenerPorId = (req, res) => {
    Usuario.obtenerPorId(req.params.id, (err, usuario) => {
        if (err) {
            res.status(500).send({
                mensaje: "Error al obtener el usuario"
            });
        } else {
            res.send(usuario);
        }
    });
};