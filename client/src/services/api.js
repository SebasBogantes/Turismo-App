const API_URL = '/api';

// Registrar usuario
export const registerUsuario = async (data) => {
  const response = await fetch(`${API_URL}/usuarios/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Inicio de sesión de usuario
export const loginUsuario = async (data) => {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Obtener lista de destinos
export const obtenerDestinos = async () => {
  const response = await fetch(`${API_URL}/destinos`);
  return response.json();
};

// Crear un nuevo destino con imágenes
export const crearDestino = async (data, token) => {
  const formData = new FormData();

  formData.append('nombre', data.nombre);
  formData.append('descripcion', data.descripcion);
  formData.append('ubicacion', data.ubicacion);
  formData.append('categoria', data.categoria);
  formData.append('precio', data.precio);

  if (Array.isArray(data.imagenes)) {
    data.imagenes.forEach((imagen) => {
      console.log('Adjuntando imagen:', imagen); // Verificar imágenes añadidas
      formData.append('imagenes', imagen);
    });
  } else {
    console.error('El campo "imagenes" no es un array o está indefinido:', data.imagenes);
    throw new Error('Debes proporcionar al menos una imagen.');
  }

  console.log('Contenido de FormData antes de enviar:', formData);

  const response = await fetch(`${API_URL}/destinos/crear`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error al enviar al servidor:', errorText);
    throw new Error('Error al crear destino.');
  }

  return response.json();
};


// Registrar administrador
export const registerAdministrador = async (data) => {
  const response = await fetch(`${API_URL}/administradores/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Inicio de sesión de administrador
export const loginAdministrador = async (data) => {
  const response = await fetch(`${API_URL}/administradores/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Obtener lista de administradores
export const obtenerAdministradores = async (token) => {
  const response = await fetch(`${API_URL}/administradores`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Eliminar administrador
export const eliminarAdministrador = async (id, token) => {
  const response = await fetch(`${API_URL}/administradores/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// Eliminar destino
export const eliminarDestino = async (id, token) => {
  const response = await fetch(`${API_URL}/destinos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`, // Token para autorización
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error al eliminar destino:', errorText);
    throw new Error('Error al eliminar destino.');
  }

  return response.json();
};

// Actualizar un destino
export const actualizarDestino = async (id, data, token) => {
  const response = await fetch(`${API_URL}/destinos/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`, // Token para autorización
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Enviar los datos en formato JSON
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error al actualizar destino:', errorText);
    throw new Error('Error al actualizar destino.');
  }

  return response.json();
};


