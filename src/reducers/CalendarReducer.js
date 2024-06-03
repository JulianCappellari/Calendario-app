import moment from "moment";
import { types } from "../types/types";


//Evento tipo usado para el front
// {
//   id: new Date().getTime(),
//   titulo: "Cumpleaños Julian",
//   fechaInicio: moment().toDate(),
//   fechaFin: moment().add(2, "hours").toDate(),
//   backgroundColor: "#fafafa",
//   notas: "Agregar pañuelos", // Asegúrate de tener una propiedad 'nombre' en tu evento
//   usuario: {
//     _id: "123",
//     nombre: "Julian",
//   },
// },

const estadoInicial = {
  eventos: [
    
  ],
  eventoActivo: null,
};

export const calendarReducer = (estado = estadoInicial, accion) => {
  switch (accion.type) {
    case types.eventoSetActivado:
      return {
        ...estado,
        eventoActivo: accion.payload,
      };
    case types.agregarNuevoEvento:
      return {
        ...estado,
        eventos: [...estado.eventos, accion.payload],
      };
    case types.limpiarNotaActiva:
      return {
        ...estado,
        eventoActivo: null,
      };
    case types.eventoActualizado:
      return {
        ...estado,
        eventos: estado.eventos.map(evento =>
          (evento.id === accion.payload.id) ? accion.payload : evento
        ),
      };
    case types.eliminarEvento:
      return {
        ...estado,
        eventos: estado.eventos.filter(evento =>
          (evento.id !== estado.eventoActivo.id) 
        ), //filter porque quiero evitar regresar el que la persona esta borrando
        eventoActivo: null  // elimino la nota activa (reinicio)
      };
    case types.eventoInicioCarga:
      return {
        ...estado,
        eventos: [...accion.payload] //son todos los nuevos eventos
      }
    case types.eventoLogout:
      return {
        ...estadoInicial
      }
    default:
      return estado;
  }
};
