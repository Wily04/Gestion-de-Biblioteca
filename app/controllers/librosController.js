const db = require('../config/db');
const Libro = db.libros;

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

async function eliminarLibro(req, res) {
    const libroId = req.params.id;

    try {
        const libroEliminado = await Libro.destroy({
            where: {
                libro_id: libroId
            }
        });

        if (libroEliminado > 0) {
            res.status(200).send({ message: `Libro con ID ${libroId} eliminado correctamente.` });
        } else {
            res.status(404).send({ message: `No se encontró ningún libro con el ID ${libroId}.` });
        }
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        res.status(500).send({ message: 'Error al eliminar el libro.' });
    }
}

module.exports = { insertLibro, getLibros, eliminarLibro };