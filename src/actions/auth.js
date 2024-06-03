// Importa la librería SweetAlert2 para mostrar mensajes modales atractivos
import Swal from "sweetalert2";

// Importa funciones para realizar solicitudes (fetch) con y sin token
import { fetchConToken, fetchSinToken } from "../helpers/fetch";

// Importa tipos de acciones definidos en otro archivo
import { types } from "../types/types";

// Importa la función eventoLogout desde otro archivo
import { eventoLogout } from "./eventos";

// Función para iniciar sesión
export const empezarLogin = (email, password) => {
  return async (dispatch) => {
    try {
      console.log("Comenzando el inicio de sesión");

      // Realiza una solicitud de inicio de sesión sin token
      const respuesta = await fetchSinToken("auth", { email, password }, "POST");
      const body = await respuesta.json();

      if (body.ok) {
        // Almacena el token y la fecha de inicio en el almacenamiento local
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-inicio-dato", new Date().getTime());

        // Despacha la acción de inicio de sesión con los datos del usuario
        dispatch(
          login({
            uid: body.uid,
            nombre: body.nombre,
          })
        );
      } else {
        // Muestra un mensaje de error si la respuesta no es exitosa
        Swal.fire("Error", body.message, "error");
      }
    } catch (error) {
      console.log(error);
      // Maneja errores si es necesario
    }
  };
};

// Función para iniciar el proceso de registro
export const empezarRegistro = (email, password, nombre) => {
  return async (dispatch) => {
    try {
      console.log("Comenzando el registro");

      // Realiza una solicitud de registro sin token
      const respuesta = await fetchSinToken("auth/new", { email, password, nombre }, "POST");
      const body = await respuesta.json();

      if (body.ok) {
        // Almacena el token y la fecha de inicio en el almacenamiento local
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-inicio-dato", new Date().getTime());

        // Despacha la acción de inicio de sesión con los datos del usuario
        dispatch(
          login({
            uid: body.uid,
            nombre: body.nombre,
          })
        );
      } else {
        // Muestra un mensaje de error si la respuesta no es exitosa
        Swal.fire("Error", body.message, "error");
      }
    } catch (error) {
      console.log(error);
      // Maneja errores si es necesario
    }
  };
};

// Función para iniciar el proceso de verificación (renew) del token
export const empezarCheking = () => {
  return async (dispatch) => {
    try {
      console.log("Comenzando la verificación del token");

      // Realiza una solicitud de verificación con token
      const respuesta = await fetchConToken("auth/renew");
      const body = await respuesta.json();

      if (body.ok) {
        // Almacena el token y la fecha de inicio en el almacenamiento local
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-inicio-dato", new Date().getTime());

        // Despacha la acción de inicio de sesión con los datos del usuario
        dispatch(
          login({
            uid: body.uid,
            nombre: body.nombre,
          })
        );
      } else {
        // Despacha la acción de finalización de la verificación si no es exitosa
        dispatch(checkingFinalizado());
      }
    } catch (error) {
      console.log(error);
      // Maneja errores si es necesario
    }
  };
};

// Acción para indicar que la verificación ha finalizado
const checkingFinalizado = () => ({
  type: types.authChekingFinalizado,
});

// Acción de inicio de sesión con los datos del usuario
const login = (usuario) => ({
  type: types.authLogin,
  payload: usuario,
});

// Función para iniciar el proceso de cierre de sesión
export const empezarLogout = () => {
  return (dispatch) => {
    // Limpia el almacenamiento local (elimina el token)
    localStorage.clear();

    // Despacha la acción de evento de cierre de sesión
    dispatch(eventoLogout());

    // Despacha la acción de cierre de sesión
    dispatch(logout());
  };
};

// Acción de cierre de sesión
const logout = () => ({
  type: types.authlogout,
});
