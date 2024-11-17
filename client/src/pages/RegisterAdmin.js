import React, { useState } from 'react';
import { registerAdministrador } from '../services/api';

const RegisterAdmin = () => {
    const [formData, setFormData] = useState({
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
        setMessage('');
        setError('');
        try {
            const response = await registerAdministrador(formData);
            if (response.message) {
                setMessage('Administrador registrado correctamente.');
                setFormData({ nombre: '', correo: '', contraseña: '' });
            } else {
                throw new Error(response.message || 'Error al registrar administrador');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Registro de Administrador</h1>
            <form className="p-4 border rounded bg-light" onSubmit={handleSubmit}>
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
                    Registrar Administrador
                </button>
            </form>
            {message && <div className="alert alert-success mt-3">{message}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default RegisterAdmin;
