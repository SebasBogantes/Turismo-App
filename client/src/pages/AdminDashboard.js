import React, { useState, useEffect } from "react";
import { crearDestino, obtenerDestinos, eliminarDestino, actualizarDestino } from "../services/api";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    ubicacion: "",
    categoria: "",
    precio: "",
  });
  const [imagenes, setImagenes] = useState([]);
  const [vistaPrevia, setVistaPrevia] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [destinos, setDestinos] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const fetchDestinos = async () => {
      try {
        const data = await obtenerDestinos();
        setDestinos(data);
      } catch (err) {
        setFetchError("No se pudieron cargar los destinos.");
      }
    };
    fetchDestinos();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const nuevosArchivos = Array.from(e.target.files);
    const nuevasVistasPrevias = nuevosArchivos.map((file) =>
      URL.createObjectURL(file)
    );

    setImagenes((prev) => [...prev, ...nuevosArchivos]);
    setVistaPrevia((prev) => [...prev, ...nuevasVistasPrevias]);
  };

  const handleRemoveImage = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
    setVistaPrevia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró un token válido. Por favor, inicia sesión.");
      }

      if (imagenes.length === 0) {
        throw new Error("Debes proporcionar al menos una imagen.");
      }

      const data = {
        ...formData,
        imagenes,
      };

      const response = await crearDestino(data, token);

      if (response.message) {
        setMessage(response.message);
        setFormData({
          nombre: "",
          descripcion: "",
          ubicacion: "",
          categoria: "",
          precio: "",
        });
        setImagenes([]);
        setVistaPrevia([]);
        setDestinos((prev) => [...prev, response.destino]);
      } else {
        throw new Error("No se pudo crear el destino. Inténtalo de nuevo.");
      }
    } catch (err) {
      console.error("Error al crear destino:", err.message);
      setError(err.message || "Error al crear destino");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarDestino = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró un token válido. Por favor, inicia sesión.");
      }

      const response = await eliminarDestino(id, token);
      if (response.message) {
        setMessage(response.message);
        setDestinos((prev) => prev.filter((destino) => destino._id !== id));
      } else {
        throw new Error("No se pudo eliminar el destino.");
      }
    } catch (err) {
      console.error("Error al eliminar destino:", err.message);
      setError(err.message || "Error al eliminar destino.");
    }
  };

  const handleEditClick = (destino) => {
    setEditData(destino);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se encontró un token válido. Por favor, inicia sesión.");
      }

      const response = await actualizarDestino(editData._id, editData, token);

      if (response.message) {
        setMessage(response.message);
        setDestinos((prev) =>
          prev.map((destino) =>
            destino._id === editData._id ? { ...editData } : destino
          )
        );
        setEditData(null);
      } else {
        throw new Error("No se pudo actualizar el destino.");
      }
    } catch (err) {
      console.error("Error al editar destino:", err.message);
      setError(err.message || "Error al editar destino.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Panel de Administración</h1>
      <h2 className="text-center">Añadir Nuevo Destino</h2>
      <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre del Destino</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Nombre del Destino"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Categoría</label>
          <select
            name="categoria"
            className="form-select"
            value={formData.categoria}
            onChange={handleInputChange}
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
            placeholder="Precio"
            value={formData.precio}
            onChange={handleInputChange}
            min="0"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imágenes</label>
          <input
            type="file"
            name="imagenes"
            className="form-control"
            multiple
            onChange={handleImageChange}
          />
          <div className="mt-3">
            {vistaPrevia.map((imagen, index) => (
              <div
                key={index}
                className="d-flex align-items-center mb-2"
                style={{ gap: "10px" }}
              >
                <img
                  src={imagen}
                  alt="Preview"
                  className="img-thumbnail"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveImage(index)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Creando..." : "Crear Destino"}
        </button>
      </form>
      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <h2 className="text-center mt-5">Lista de Destinos</h2>
      {fetchError && <div className="alert alert-danger">{fetchError}</div>}
      <div className="row">
        {destinos.map((destino) => (
          <div className="col-md-4 mb-4" key={destino._id}>
            <div className="card">
              {destino.imagenes && destino.imagenes.length > 0 && (
                <div
                  id={`carousel-${destino._id}`}
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {destino.imagenes.map((imagen, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                      >
                        <img
                          src={imagen}
                          className="d-block w-100"
                          alt={`Imagen de ${destino.nombre}`}
                          style={{ maxHeight: "200px", objectFit: "cover" }}
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
                    <span className="carousel-control-prev-icon"></span>
                    <span className="visually-hidden">Anterior</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#carousel-${destino._id}`}
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon"></span>
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
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => handleEditClick(destino)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger mt-2 ms-2"
                  onClick={() => handleEliminarDestino(destino._id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editData && (
        <div className="modal d-block">
          <div className="modal-content p-4">
            <h4>Editar Destino</h4>
            <input
              type="text"
              name="nombre"
              value={editData.nombre}
              onChange={handleEditChange}
              className="form-control mb-3"
            />
            <textarea
              name="descripcion"
              value={editData.descripcion}
              onChange={handleEditChange}
              className="form-control mb-3"
            ></textarea>
            <input
              type="text"
              name="ubicacion"
              value={editData.ubicacion}
              onChange={handleEditChange}
              className="form-control mb-3"
            />
            <input
              type="text"
              name="categoria"
              value={editData.categoria}
              onChange={handleEditChange}
              className="form-control mb-3"
            />
            <input
              type="number"
              name="precio"
              value={editData.precio}
              onChange={handleEditChange}
              className="form-control mb-3"
            />
            <button className="btn btn-success" onClick={handleSaveEdit}>
              Guardar Cambios
            </button>
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setEditData(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
