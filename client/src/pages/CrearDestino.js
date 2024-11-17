import React, { useState } from 'react';
import { crearDestino } from '../services/api';

const CrearDestino = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    categoria: '',
    precio: '',
  });

  const [imagenes, setImagenes] = useState([]); // Estado para manejar las imágenes
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImagenes(e.target.files); // Guardar los archivos seleccionados
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró un token válido. Por favor, inicia sesión.');
      }

      if (imagenes.length === 0) {
        throw new Error('Debes cargar al menos una imagen.');
      }

      const data = new FormData(); // Usar FormData para manejar archivos
      data.append('nombre', formData.nombre);
      data.append('descripcion', formData.descripcion);
      data.append('ubicacion', formData.ubicacion);
      data.append('categoria', formData.categoria);
      data.append('precio', formData.precio);

      for (let i = 0; i < imagenes.length; i++) {
        data.append('imagenes', imagenes[i]); // Agregar todas las imágenes
      }

      const response = await crearDestino(data, token);

      if (response.message) {
        setMessage(response.message);
        setFormData({
          nombre: '',
          descripcion: '',
          ubicacion: '',
          categoria: '',
          precio: '',
        });
        setImagenes([]); // Limpiar imágenes después de éxito
      } else {
        throw new Error('No se pudo crear el destino. Inténtalo de nuevo.');
      }
    } catch (err) {
      console.error('Error al crear destino:', err.message);
      setError(err.message || 'Error al crear destino');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Crear Nuevo Destino</h1>
      <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del Destino</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Nombre del Destino"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input
            type="text"
            name="ubicacion"
            className="form-control"
            placeholder="Ubicación"
            value={formData.ubicacion}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select
            name="categoria"
            className="form-select"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="">Seleccione una Categoría</option>
            <option value="aventura">Aventura</option>
            <option value="cultura">Cultura</option>
            <option value="gastronomía">Gastronomía</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input
            type="number"
            name="precio"
            className="form-control"
            placeholder="Precio en dólares"
            value={formData.precio}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imágenes</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Destino'}
        </button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default CrearDestino;
