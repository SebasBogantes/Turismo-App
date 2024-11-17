const Actividad = require('../models/Actividad');

// Crear Actividad
const crearActividad = async (req, res) => {
  const { nombre, descripcion, precio, horariosDisponibles, destino } = req.body;

  try {
    const nuevaActividad = new Actividad({ nombre, descripcion, precio, horariosDisponibles, destino });
    await nuevaActividad.save();

    res.status(201).json({ message: 'Actividad creada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear actividad', error: error.message });
  }
};

// Obtener Actividades
const obtenerActividades = async (req, res) => {
  try {
    const actividades = await Actividad.find();
    res.status(200).json(actividades);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener actividades', error: error.message });
  }
};

// Actualizar Actividad
const actualizarActividad = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, horariosDisponibles, destino } = req.body;

  try {
    await Actividad.findByIdAndUpdate(id, { nombre, descripcion, precio, horariosDisponibles, destino });
    res.status(200).json({ message: 'Actividad actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar actividad', error: error.message });
  }
};

// Eliminar Actividad
const eliminarActividad = async (req, res) => {
  const { id } = req.params;

  try {
    await Actividad.findByIdAndDelete(id);
    res.status(200).json({ message: 'Actividad eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar actividad', error: error.message });
  }
};

module.exports = { crearActividad, obtenerActividades, actualizarActividad, eliminarActividad };
