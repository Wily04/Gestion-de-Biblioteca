const db = require('../config/db'); // Asegúrate que esta ruta es correcta
const Libro = db.libros;

// Insertar un nuevo libro
function insertLibro(req, res) {
    console.log(req.body);
    Libro.create({
        libro_id: req.body['libro_id'],
        titulo: req.body['titulo'],
        autor_id: req.body['autor_id'],
        editorial_id: req.body['editorial_id'],
        genero: req.body['genero'],
        fecha_publicacion: req.body['fecha_publicacion'],
        copias_disponibles: req.body['copias_disponibles'],
        copias_totales: req.body['copias_totales']
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Sucedió un error inesperado al insertar el libro'
            });
        });
}

// Obtener todos los libros
function getLibros(req, res) {
    Libro.findAll()
        .then(data => {
            if (!data || data.length === 0) {
                res.status(404).send({ message: 'No se encontraron libros' });
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Sucedió un error al obtener los libros"
            });
        });
}

module.exports = { insertLibro, getLibros };
