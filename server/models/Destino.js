const mongoose = require('mongoose');

const destinoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  ubicacion: { type: String, required: true },
  categoria: {
    type: String,
    enum: ['aventura', 'cultura', 'gastronomía'], // Categorías predefinidas
    required: true,
  },
  precio: { type: Number, required: true, min: 0 }, // Validación de precio mínimo
  imagenes: { type: [String], required: true }, // Array de rutas de imágenes
});

module.exports = mongoose.model('Destino', destinoSchema);
