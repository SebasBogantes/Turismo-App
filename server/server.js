// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const administradorRoutes = require('./routes/administradorRoutes');
const destinoRoutes = require('./routes/destinoRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const actividadRoutes = require('./routes/actividadRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const reseñaRoutes = require('./routes/reseñaRoutes');

// Configuración inicial
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/administradores', administradorRoutes);
app.use('/api/destinos', destinoRoutes);
app.use('/api/hoteles', hotelRoutes);
app.use('/api/actividades', actividadRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/reseñas', reseñaRoutes);
app.use('/uploads', express.static('uploads'));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
