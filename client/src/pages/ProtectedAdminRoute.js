import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // Redirige al login si no está autenticado o no es administrador
  return token && role === 'admin' ? children : <Navigate to="/login" />;
};

export default ProtectedAdminRoute;
