const db = require('../config/db');
const Editorial = db.editoriales;


function insertEditorial(req, res) {
    console.log(req.body)
    Editorial.create({
        editorial_id: req.body['editorial_id'],
        nombre: req.body['nombre'],
        direccion: req.body['direccion'],
        telefono: req.body['telefono'],
        email: req.body['email']
    })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Sucedió un error inesperado'
            });
        });
}


async function getEditoriales(req, res) {
    Editorial.findAll()
        .then(data => {
            if (!data || data.length === 0) {
                res.status(404).send({ message: 'No se encontraron editoriales' });
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Sucedió un error al obtener las editoriales"
            });
        });
}

module.exports = { getEditoriales, insertEditorial };
