// Importa la librería SweetAlert2 para mostrar mensajes modales atractivos
import Swal from "sweetalert2";

// Importa funciones para realizar solicitudes (fetch) con token
import { fetchConToken } from "../helpers/fetch";

// Importa función para preparar eventos desde otro archivo
import { prepararEventos } from "../helpers/prepararEventos";

// Importa tipos de acciones definidos en otro archivo
import { types } from "../types/types";

// Acción para comenzar a grabar un nuevo evento
export const empezarAGrabar = (evento) => {
  return async (dispatch, getState) => {
    // Obtiene el nombre y el uid del estado de Redux
    const { uid, nombre } = getState().auth;

    try {
      // Realiza una solicitud para grabar un nuevo evento con token
      const respuesta = await fetchConToken("eventos", evento, "POST");
      const body = await respuesta.json();

      if (body.ok) {
        // Actualiza el ID y el usuario del evento con la respuesta del servidor
        evento.id = body.evento.id;
        evento.usuario = {
          _id: uid,
          nombre: nombre,
        };

        // Despacha la acción para agregar el nuevo evento al estado
        dispatch(agregarNuevoEvento(evento));
      }
    } catch (error) {
      console.log(error);
      // Maneja errores si es necesario
    }
  };
};

// Acción para agregar un nuevo evento al estado
const agregarNuevoEvento = (evento) => ({
  type: types.agregarNuevoEvento,
  payload: evento,
});

// Acción para activar un evento
export const eventoSetActivado = (evento) => ({
  type: types.eventoSetActivado,
  payload: evento,
});

// Acción para limpiar la nota activa (evento actual)
export const limpiarNotaActiva = () => ({
  type: types.limpiarNotaActiva,
});

// Acción para actualizar un evento en la base de datos
export const actualizarEventoDB = (evento) => {
  return async (dispatch) => {
    try {
      // Realiza una solicitud para actualizar un evento con token
      const respuesta = await fetchConToken(`eventos/${evento.id}`, evento, "PUT");
      const body = await respuesta.json();

      if (body.ok) {
        // Despacha la acción para actualizar el evento en el estado
        dispatch(eventoActualizado(evento));
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

// Acción para indicar que un evento ha sido actualizado
const eventoActualizado = (evento) => ({
  type: types.eventoActualizado,
  payload: evento,
});

// Acción para eliminar un evento de la base de datos
export const eliminarEventoDB = () => {
  return async (dispatch, getState) => {
    // Obtiene el ID del evento activo desde el estado de calendario
    const { id } = getState().calendario.eventoActivo;
    console.log("Eliminando evento con ID:", id);

    try {
      // Realiza una solicitud para eliminar un evento con token
      const respuesta = await fetchConToken(`eventos/${id}`, {}, "DELETE");
      const body = await respuesta.json();

      if (body.ok) {
        // Despacha la acción para eliminar el evento del estado
        dispatch(eliminarEvento());
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

// Acción para indicar que un evento ha sido eliminado
const eliminarEvento = () => ({
  type: types.eliminarEvento,
});

// Acción para iniciar la carga de eventos desde la base de datos
export const eventoInicioCarga = () => {
  return async (dispatch) => {
    try {
      // Realiza una solicitud para obtener eventos con token
      const respuesta = await fetchConToken("eventos");
      const body = await respuesta.json();

      // Prepara los eventos recibidos antes de despachar la acción
      const eventos = prepararEventos(body.eventos);

      // Despacha la acción para cargar eventos en el estado
      dispatch(eventosCargados(eventos));
    } catch (error) {
      console.log(error);
      // Maneja errores si es necesario
    }
  };
};

// Acción para indicar que los eventos han sido cargados
const eventosCargados = (eventos) => ({
  type: types.eventoInicioCarga,
  payload: eventos,
});

// Acción para realizar el logout de eventos
export const eventoLogout = () => ({
  type: types.eventoLogout,
});
