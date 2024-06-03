// Configura la URL base para las solicitudes a la API
const baseUrl = process.env.REACT_APP_API_URL;

// Función para realizar solicitudes sin token de autenticación
const fetchSinToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;

  console.log(url);

  // Maneja solicitudes GET y otras solicitudes (POST, PUT, DELETE)
  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

// Función para realizar solicitudes con token de autenticación
const fetchConToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem('token') || '';

  console.log(url);

  // Maneja solicitudes GET y otras solicitudes (POST, PUT, DELETE)
  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        'x-token': token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        'x-token': token,
      },
      body: JSON.stringify(data),
    });
  }
};

// Exporta las funciones para su uso en otros archivos
export { fetchSinToken, fetchConToken };
