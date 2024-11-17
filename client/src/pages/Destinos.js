import React, { useEffect, useState } from 'react';
import { obtenerDestinos } from '../services/api.js';

const Destinos = () => {
  const [destinos, setDestinos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerDestinos();
        console.log('Destinos obtenidos:', data); // Depuración
        if (Array.isArray(data)) {
          setDestinos(data);
        } else {
          throw new Error('La respuesta de la API no es válida.');
        }
      } catch (err) {
        console.error('Error al obtener destinos:', err.message);
        setError('No se pudieron cargar los destinos. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Destinos Turísticos</h1>
      {loading ? (
        <p className="text-center">Cargando destinos...</p>
      ) : error ? (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      ) : destinos.length === 0 ? (
        <p className="text-center">No hay destinos disponibles.</p>
      ) : (
        <div className="row">
          {destinos.map((destino) => (
            <div className="col-md-4 mb-4" key={destino._id}>
              <div className="card">
                {/* Carrusel de imágenes */}
                {destino.imagenes && destino.imagenes.length > 0 && (
                  <div
                    id={`carousel-${destino._id}`}
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {destino.imagenes.map((imagen, index) => (
                        <div
                          className={`carousel-item ${index === 0 ? 'active' : ''}`}
                          key={index}
                        >
                          <img
                            src={imagen}
                            className="d-block w-100"
                            alt={`Imagen de ${destino.nombre}`}
                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#carousel-${destino._id}`}
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Anterior</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target={`#carousel-${destino._id}`}
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Siguiente</span>
                    </button>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{destino.nombre}</h5>
                  <p className="card-text">{destino.descripcion}</p>
                  <p className="text-muted">Ubicación: {destino.ubicacion}</p>
                  <p className="badge bg-secondary">{destino.categoria}</p>
                  <p className="text-success">Precio: ${destino.precio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Destinos;
