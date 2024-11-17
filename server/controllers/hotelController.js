const Hotel = require('../models/Hotel');

// Crear Hotel
const crearHotel = async (req, res) => {
  const { nombre, precio, servicios, disponibilidad, destino } = req.body;

  try {
    const nuevoHotel = new Hotel({ nombre, precio, servicios, disponibilidad, destino });
    await nuevoHotel.save();

    res.status(201).json({ message: 'Hotel creado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear hotel', error: error.message });
  }
};

// Obtener Hoteles
const obtenerHoteles = async (req, res) => {
  try {
    const hoteles = await Hotel.find();
    res.status(200).json(hoteles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener hoteles', error: error.message });
  }
};

// Actualizar Hotel
const actualizarHotel = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, servicios, disponibilidad, destino } = req.body;

  try {
    await Hotel.findByIdAndUpdate(id, { nombre, precio, servicios, disponibilidad, destino });
    res.status(200).json({ message: 'Hotel actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar hotel', error: error.message });
  }
};

// Eliminar Hotel
const eliminarHotel = async (req, res) => {
  const { id } = req.params;

  try {
    await Hotel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Hotel eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar hotel', error: error.message });
  }
};

module.exports = { crearHotel, obtenerHoteles, actualizarHotel, eliminarHotel };
