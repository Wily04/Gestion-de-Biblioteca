const Prestamo =require('./models/prestamosModel');

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
    const { nombre, monto, fecha } = req.body;
    try {
        const prestamo = await Prestamo.create({ nombre, monto, fecha });
        res.status(201).json({ message: 'Préstamo creado exitosamente', id: prestamo.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const actualizarPrestamo = async (req, res) => {
    const { id } = req.params;
    const { nombre, monto, fecha } = req.body;
    try {
        const prestamo = await Prestamo.findByPk(id);
        if (!prestamo) {
            return res.status(404).json({ message: 'Préstamo no encontrado' });
        }
        await prestamo.update({ nombre, monto, fecha });
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