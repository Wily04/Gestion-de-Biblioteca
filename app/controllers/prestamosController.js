const Prestamo = require('../models/prestamosModel');

const obtenerPrestamos = async (req, res) => {
    try {
        const prestamos = await Prestamo.findAll();
        res.json(prestamos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const obtenerPrestamosPorID = async (req, res) => {
    const { id } = req.params;
    try {
        const prestamo = await Prestamo.findByPk(id);
        if (!prestamo) {
            return res.status(404).json({ message: 'Préstamo no encontrado' });
        }
        res.json(prestamo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const crearPrestamo = async (req, res) => {
    try {
        console.log('Datos recibidos para crear préstamo:', req.body);
        const { usuario_id, libro_id, fecha_prestamo, fecha_vencimiento, estado } = req.body;
        if (!usuario_id || !libro_id || !fecha_prestamo || !fecha_vencimiento || !estado) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }
        const nuevoPrestamo = await Prestamo.create({
            usuario_id,
            libro_id,
            fecha_prestamo,
            fecha_vencimiento,
            estado
        });

        
        console.log('Préstamo guardado en la base de datos:', nuevoPrestamo);
        res.status(201).json(nuevoPrestamo);
    } catch (error) {
        console.error('Error al crear el préstamo:', error);
        
        res.status(500).json({ error: 'Error al crear el préstamo', details: error.message });
    }
};

const actualizarPrestamo = async (req, res) => {
    const { id } = req.params;
    const { usuario_id, libro_id, fecha_prestamo, fecha_vencimiento, fecha_devolucion, estado } = req.body;
    try {
        const prestamo = await Prestamo.findByPk(id);
        if (!prestamo) {
            return res.status(404).json({ message: 'Préstamo no encontrado' });
        }
        await prestamo.update({ 
            usuario_id, 
            libro_id, 
            fecha_prestamo, 
            fecha_vencimiento, 
            fecha_devolucion, 
            estado 
        });
        res.json({ message: 'Préstamo actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const eliminarPrestamo = async (req, res) => {
    const { id } = req.params;
    try {
        const prestamo = await Prestamo.findByPk(id);
        if (!prestamo) {
            return res.status(404).json({ message: 'Préstamo no encontrado' });
        }
        await prestamo.destroy();
        res.json({ message: 'Préstamo eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    obtenerPrestamos,
    obtenerPrestamosPorID,
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo
};
