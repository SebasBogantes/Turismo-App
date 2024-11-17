import React, { useState } from 'react';
import { registerUsuario } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    cedulaPasaporte: '',
    nombre: '',
    correo: '',
    contraseña: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Datos enviados:', formData); // Log para depuración

    try {
      const response = await registerUsuario(formData);
      console.log('Respuesta de la API:', response); // Log para depuración

      if (response.message === 'Registro exitoso') {
        setMessage('Usuario registrado correctamente.');
        setError('');
        // Limpiar formulario
        setFormData({
          cedulaPasaporte: '',
          nombre: '',
          correo: '',
          contraseña: '',
        });
      } else {
        throw new Error(response.message || 'Error desconocido en el registro');
      }
    } catch (err) {
      console.error('Error en el registro:', err.message);
      setMessage('');
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Registro de Usuario</h1>
      <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Cédula o Pasaporte</label>
          <input
            type="text"
            name="cedulaPasaporte"
            className="form-control"
            placeholder="Cédula o Pasaporte"
            value={formData.cedulaPasaporte}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            className="form-control"
            placeholder="Correo Electrónico"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            className="form-control"
            placeholder="Contraseña"
            value={formData.contraseña}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Registrarse
        </button>
      </form>
      {/* Mensajes de éxito o error */}
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default Register;
