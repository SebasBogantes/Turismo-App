const Reserva = require('../models/Reserva');

// Crear Reserva
const crearReserva = async (req, res) => {
  const { cedulaPasaporte, hotel, actividad, costo, fechaReserva } = req.body;

  try {
    const nuevaReserva = new Reserva({
      cedulaPasaporte: req.user.id, // Usuario autenticado
      hotel,
      actividad,
      costo,
      fechaReserva,
    });
    await nuevaReserva.save();

    res.status(201).json({ message: 'Reserva creada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear reserva', error: error.message });
  }
};

// Obtener Reservas del Usuario
const obtenerReservasUsuario = async (req, res) => {
  try {
    const reservas = await Reserva.find({ cedulaPasaporte: req.user.id }).populate('hotel').populate('actividad');
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reservas', error: error.message });
  }
};

// Eliminar Reserva
const eliminarReserva = async (req, res) => {
  const { id } = req.params;

  try {
    await Reserva.findByIdAndDelete(id);
    res.status(200).json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar reserva', error: error.message });
  }
};

module.exports = { crearReserva, obtenerReservasUsuario, eliminarReserva };
