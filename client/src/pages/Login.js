import React, { useState } from 'react';
import { loginUsuario } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    contraseña: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Datos enviados:', formData); // Log para depuración

    try {
      const response = await loginUsuario(formData);
      console.log('Respuesta de la API:', response); // Log para depuración

      if (response.token) {
        // Guardar token y rol en el almacenamiento local
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        setMessage('Inicio de sesión exitoso.');
        setError('');

        // Redirigir según el rol
        if (response.role === 'admin') {
          navigate('/admin-dashboard'); // Redirigir al panel de administración
        } else {
          navigate('/destinos'); // Redirigir al listado de destinos
        }
      } else {
        throw new Error(response.message || 'Error desconocido al iniciar sesión');
      }
    } catch (err) {
      console.error('Error en el inicio de sesión:', err.message);
      setMessage('');
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Inicio de Sesión</h1>
      <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
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
          Iniciar Sesión
        </button>
      </form>
      {/* Mensajes de éxito o error */}
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default Login;
