const db = require('../config/db');
const Autor = db.Autores;

function insertAutor(req, res) {
    console.log(req.body)
    Autor.create({
        autor_id: req.body['autorId'],
        nombre: req.body['nombre'],
        nacionalidad: req.body['nacionalidad'],
        fecha_nacimiento: req.body['fch_nacimiento'],
        fecha_fallecimieno: req.body['fch_fallecimiento'] || null,
        
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Sucedio un error inesperado'
            });
        });
}

async function getAutor(req, res) {
    Autor.findAll()
        .then(data => {
            if (!data) { res.status(404).send({ message: 'No se encontraron Autores' }) }
            else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Sucedio un error al obtener los registros de Autor"
            })
        })
}

module.exports = { getAutor, insertAutor }