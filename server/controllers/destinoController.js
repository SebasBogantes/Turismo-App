// Crear Destino
const Destino = require('../models/Destino');

const crearDestino = async (req, res) => {
  console.log('Datos recibidos del formulario:', req.body);
  console.log('Archivos recibidos:', req.files);

  const { nombre, descripcion, ubicacion, categoria, precio } = req.body;

  try {
    if (!req.files || req.files.length === 0) {
      console.error('No se recibieron imágenes.');
      return res.status(400).json({ message: 'Debes proporcionar al menos una imagen.' });
    }

    const imagenes = req.files.map((file) => `/uploads/${file.filename}`);
    console.log('Rutas de imágenes procesadas:', imagenes);

    const nuevoDestino = new Destino({
      nombre,
      descripcion,
      ubicacion,
      categoria,
      precio,
      imagenes,
    });

    await nuevoDestino.save();
    res.status(201).json({ message: 'Destino creado correctamente', destino: nuevoDestino });
  } catch (error) {
    console.error('Error al crear destino:', error.message);
    res.status(500).json({ message: 'Error al crear destino', error: error.message });
  }
};




// Obtener Destinos
const obtenerDestinos = async (req, res) => {
  try {
    const destinos = await Destino.find();
    res.status(200).json(destinos);
  } catch (error) {
    console.error('Error al obtener destinos:', error);
    res.status(500).json({ message: 'Error al obtener destinos', error: error.message });
  }
};

// Actualizar Destino
const actualizarDestino = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, ubicacion, categoria, precio, imagenesEliminar } = req.body;

  try {
    const destino = await Destino.findById(id);
    if (!destino) {
      return res.status(404).json({ message: 'Destino no encontrado' });
    }

    // Eliminar las imágenes seleccionadas
    if (imagenesEliminar && Array.isArray(imagenesEliminar)) {
      destino.imagenes = destino.imagenes.filter((img) => !imagenesEliminar.includes(img));
    }

    // Agregar nuevas imágenes si se subieron
    if (req.files && req.files.length > 0) {
      const nuevasImagenes = req.files.map((file) => `/uploads/${file.filename}`);
      destino.imagenes.push(...nuevasImagenes);
    }

    // Actualizar otros campos
    destino.nombre = nombre || destino.nombre;
    destino.descripcion = descripcion || destino.descripcion;
    destino.ubicacion = ubicacion || destino.ubicacion;
    destino.categoria = categoria || destino.categoria;
    destino.precio = precio || destino.precio;

    await destino.save();

    res.status(200).json({ message: 'Destino actualizado correctamente', destino });
  } catch (error) {
    console.error('Error al actualizar destino:', error);
    res.status(500).json({ message: 'Error al actualizar destino' });
  }
};

// Eliminar Destino
const eliminarDestino = async (req, res) => {
  const { id } = req.params;

  try {
    await Destino.findByIdAndDelete(id);
    res.status(200).json({ message: 'Destino eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar destino:', error);
    res.status(500).json({ message: 'Error al eliminar destino', error: error.message });
  }
};

module.exports = {
  crearDestino,
  obtenerDestinos,
  actualizarDestino,
  eliminarDestino,
};
