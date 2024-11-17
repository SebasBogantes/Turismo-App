const Reseña = require('../models/Reseña');

// Crear Reseña
const crearReseña = async (req, res) => {
  const { destino, calificacion, comentario } = req.body;

  try {
    const nuevaReseña = new Reseña({
      usuario: req.user.id, // Usuario autenticado
      destino,
      calificacion,
      comentario,
    });
    await nuevaReseña.save();

    res.status(201).json({ message: 'Reseña creada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear reseña', error: error.message });
  }
};

// Obtener Reseñas por Destino
const obtenerReseñasDestino = async (req, res) => {
  const { destinoId } = req.params;

  try {
    const reseñas = await Reseña.find({ destino: destinoId }).populate('usuario', 'nombre');
    res.status(200).json(reseñas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reseñas', error: error.message });
  }
};

// Eliminar Reseña
const eliminarReseña = async (req, res) => {
  const { id } = req.params;

  try {
    await Reseña.findByIdAndDelete(id);
    res.status(200).json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar reseña', error: error.message });
  }
};

module.exports = { crearReseña, obtenerReseñasDestino, eliminarReseña };
