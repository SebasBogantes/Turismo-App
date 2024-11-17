const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(`Intentando conectar a: ${process.env.MONGO_URI}`);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión: ${error.message}`);
    process.exit(1); // Finaliza la aplicación si no puede conectarse
  }
};

module.exports = connectDB;
