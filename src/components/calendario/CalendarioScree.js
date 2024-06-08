// Importa los componentes y librerías necesarios
import React, { useEffect } from "react";
import NavBar from "../ui/NavBar"; // Componente de barra de navegación
import { Calendar, momentLocalizer } from "react-big-calendar"; // Componente de calendario
import moment from "moment"; // Librería para manipular fechas
import "moment/locale/es"; // Importa el idioma español para moment
import "react-big-calendar/lib/css/react-big-calendar.css"; // Estilos predeterminados del calendario
import CalendarioEvento from "./CalendarioEvento"; // Importa el componente CalendarioEvento
import { useState } from "react"; // Hook de estado de React
import CalendarioModal from "./CalendarioModal"; // Modal para agregar/editar eventos
import { useDispatch, useSelector } from "react-redux"; // Hooks de React-Redux para interactuar con el store
import { uiAbrirModal } from "../../actions/ui"; // Acción para abrir el modal
import { eventoInicioCarga, eventoSetActivado, limpiarNotaActiva } from "../../actions/eventos"; // Acciones relacionadas con eventos
import AgregarNuevoEvento from "../ui/AgregarNuevoEvento"; // Botón para agregar nuevo evento
import EliminarEvento from "../ui/EliminarEvento"; // Botón para eliminar evento

moment.locale('es');
const localizer = momentLocalizer(moment); // Configura moment para su uso con el calendario

// Traducciones específicas para el calendario en español
const messages = {
  allDay: 'Todo el día',
  previous: '<',
  next: '>',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  showMore: total => `+ Ver más (${total})`
};

const CalendarioScree = () => {
  // Obtiene datos del estado mediante el hook useSelector de React-Redux
  const { eventos, eventoActivo } = useSelector((state) => state.calendario);
  const [ultimaVista, setUltimaVista] = useState(
    localStorage.getItem("lastView") || "month"
  );

  // Dispatch de acciones para interactuar con el store
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);

  // Efecto que carga los eventos al iniciar la pantalla
  useEffect(() => {
    dispatch(eventoInicioCarga());
  }, [dispatch]);

  // Función ejecutada al hacer doble clic en el calendario
  const dobleClick = () => {
    dispatch(uiAbrirModal());
  };

  // Función ejecutada al seleccionar un evento en el calendario
  const onEventoSeleccionado = (evento) => {
    dispatch(eventoSetActivado(evento));
  };

  // Función ejecutada al cambiar de vista en el calendario
  const onCargaVista = (vista) => {
    setUltimaVista(vista.toLowerCase()); // Guarda la última vista en localStorage
    localStorage.setItem("lastView", vista.toLowerCase());
  };

  // Función que define el estilo de los eventos en el calendario
  const estiloEvento = (evento) => ({
    backgroundColor: uid === evento.usuario._id ? "#367CF7" : "#465660",
    borderRadius: "0px",
    opacity: 0.8,
    color: "white",
  });

  // Formatea los eventos para ser compatibles con el componente Calendar
  const formattedEventos = eventos.map((evento) => ({
    ...evento,
    start: moment(evento.fechaInicio).toDate(),
    end: moment(evento.fechaFin).toDate(),
  }));

  // Función ejecutada al seleccionar un intervalo de tiempo en el calendario
  const onSelectSlot = () => {
    dispatch(limpiarNotaActiva());
  };

  // Renderiza el componente de la pantalla del calendario
  return (
    <div className="calendario-screen">
      <NavBar /> {/* Barra de navegación superior */}
      <Calendar
        key={JSON.stringify(eventos)} // Clave única basada en los eventos para forzar la actualización del calendario
        localizer={localizer}
        events={formattedEventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={messages} // Traducciones para el calendario
        eventPropGetter={estiloEvento}
        onDoubleClickEvent={dobleClick}
        onSelectEvent={onEventoSeleccionado}
        onView={onCargaVista}
        view={ultimaVista}
        onSelectSlot={onSelectSlot}
        selectable={true}
        components={{
          event: (props) => <CalendarioEvento evento={props.event} />, // Componente personalizado para mostrar detalles del evento
        }}
      />
      <AgregarNuevoEvento /> {/* Botón para agregar nuevo evento */}
      {eventoActivo && <EliminarEvento />} {/* Botón para eliminar evento, solo visible si hay un evento activo */}
      <CalendarioModal /> {/* Modal para agregar/editar eventos */}
    </div>
  );
};

export default CalendarioScree;
