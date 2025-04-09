const db = require('../config/db');
const Autor = db.Autores;

function insertAutor(req, res) {
    console.log(req.body)
    Autor.create({
        autor_id: req.body['autorId'],
        nombre: req.body['nombre'],
        nacionalidad: req.body['nacionalidad'],
        fecha_nacimiento: req.body['fch_nacimiento'],
        fecha_fallecimiento: req.body['fch_fallecimiento'] || null
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
            console.log('Datos obtenidos de la base de datos:', data); 
            if (!data) {
                res.status(404).send({ message: 'No se encontraron Autores' });
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Sucedio un error al obtener los registros de Autor"
            });
        });
}

const eliminarAutor = async (req, res) => {
    const { id } = req.params;
    try {
        // Si tu clave primaria no es "id", usa findOne con where
        const autor = await Autor.findOne({ where: { autor_id: id } });

        if (!autor) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }

        await autor.destroy();
        res.json({ message: 'Autor eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAutor, insertAutor, eliminarAutor }