const db = require('../config/db');
const Prestamos = db.prestamos;

function insertPrestamo(req, res) {
    console.log(req.body);
    Prestamos.create({
        usuario_id: req.body['usuario_id'],
        libro_id: req.body['libro_id'],
        fecha_prestamo: new Date(),
        fecha_vencimiento: req.body['fecha_vencimiento'],
        fecha_devolucion: req.body['fecha_devolucion'] || null,
        estado: req.body['estado'],
        createdAt: new Date(),
        updatedAt: new Date()
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Sucedió un error inesperado'
            });
        });
}

async function getPrestamos(req, res) {
    Prestamos.findAll()
        .then(data => {
            if (!data || data.length === 0) {
                res.status(404).send({ message: 'No se encontraron préstamos' });
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Sucedió un error al obtener los préstamos'
            });
        });
}

module.exports = { insertPrestamo, getPrestamos };
