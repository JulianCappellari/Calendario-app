import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { uiAbrirModal, uiCerrarModal } from "../../actions/ui";
import {
  actualizarEvento,
  actualizarEventoDB,
  agregarNuevoEvento,
  empezarAGrabar,
  eventoActualizado,
  limpiarNotaActiva,
} from "../../actions/eventos";

// Estilos personalizados para el modal
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "800px",
    width: "80%",
  },
};

// Estado inicial para un nuevo evento
const eventoInicial = {
  titulo: "",
  notas: "",
  fechaInicio: new Date(), // Usar un objeto Date por defecto
  fechaFin: new Date(),
};

// Configuración de la aplicación para el modal
Modal.setAppElement("#root");

const CalendarioModal = () => {
  // Obtiene información del estado mediante el hook useSelector de React-Redux
  const { modalAbierto } = useSelector((state) => state.ui);
  const { eventoActivo } = useSelector((state) => state.calendario);
  const dispatch = useDispatch();

  // Estado local para la validación del título
  const [tituloValido, setTituloValido] = useState(true);

  // Estado local para los valores del formulario
  const [formValue, setFormValue] = useState(eventoInicial);

  // Extrae valores específicos del estado local
  const { notas, titulo, fechaFin, fechaInicio } = formValue;

  // Efecto para actualizar el estado local cuando cambia el evento activo
  useEffect(() => {
    if (eventoActivo) {
      setFormValue(eventoActivo);
    } else {
      setFormValue(eventoInicial);
    }
  }, [eventoActivo, setFormValue]);

  // Función ejecutada después de abrir el modal
  const afterOpenModal = () => {};

  // Función para cerrar el modal y limpiar la nota activa
  const closeModal = () => {
    dispatch(uiCerrarModal());
    dispatch(limpiarNotaActiva());
    setFormValue(eventoInicial);
  };

  // Manejador de cambio de fecha de inicio
  const handleFechaInicioChange = (e) => {
    setFormValue({ ...formValue, fechaInicio: new Date(e.target.value) });
  };

  // Manejador de cambio de fecha de fin
  const handleFechaFinChange = (e) => {
    setFormValue({ ...formValue, fechaFin: new Date(e.target.value) });
  };

  // Manejador de cambio de título
  const handleTituloChange = (e) => {
    setFormValue({ ...formValue, titulo: e.target.value });
  };

  // Manejador de cambio de notas
  const handleNotasChange = (e) => {
    setFormValue({ ...formValue, notas: e.target.value });
  };

  // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que la fecha de fin no sea menor que la fecha de inicio
    if (formValue.fechaFin < formValue.fechaInicio) {
      Swal.fire(
        "Error",
        "La fecha y hora fin debe ser mayor que fecha y hora inicio",
        "error"
      );
      return;
    }

    // Validar que el título tenga al menos 2 caracteres
    if (titulo.trim().length < 2) {
      return setTituloValido(false);
    }

    // Despachar la acción correspondiente según si es un evento nuevo o existente
    if (eventoActivo) {
      dispatch(actualizarEventoDB(formValue));
    } else {
      dispatch(empezarAGrabar(formValue));
    }

    // Restablecer la validación del título
    setTituloValido(true);

    // Cerrar el modal después de guardar
    closeModal();
  };

  // Renderiza el componente del modal
  return (
    <div>
      <Modal
        isOpen={modalAbierto}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="mi-modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1>{eventoActivo ? "Editar evento" : "Nuevo evento"}</h1>
        <hr />

        {modalAbierto && (
          <form className="container" onSubmit={handleSubmit}>
            {/* Input para la fecha y hora de inicio */}
            <div className="mb-2">
              <label htmlFor="fechaInicio" className="form-label">
                Fecha y hora inicio
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="fechaInicio"
                value={moment(fechaInicio).format("YYYY-MM-DDTHH:mm")}
                onChange={handleFechaInicioChange}
              />
            </div>

            {/* Input para la fecha y hora de fin */}
            <div className="mb-2">
              <label htmlFor="fechaFin" className="form-label">
                Fecha y hora fin
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="fechaFin"
                value={moment(fechaFin).format("YYYY-MM-DDTHH:mm")}
                onChange={handleFechaFinChange}
              />
            </div>

            <hr />

            {/* Input para el título */}
            <div className="mb-2">
              <label htmlFor="titulo" className="form-label">
                Título y notas
              </label>
              <input
                type="text"
                className={`form-control ${!tituloValido && "is-invalid"}`}
                id="titulo"
                value={titulo}
                onChange={handleTituloChange}
                placeholder="Título del evento"
                name="titulo"
                autoComplete="off"
              />
              <small id="emailHelp" className="form-text text-muted">
                Una descripción corta
              </small>
            </div>

            {/* Textarea para las notas */}
            <div className="mb-2">
              <textarea
                className="form-control"
                id="notas"
                value={notas}
                onChange={handleNotasChange}
                placeholder="Notas"
                rows="5"
                name="notes"
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">
                Información adicional
              </small>
            </div>

            {/* Botón para guardar */}
            <button type="submit" className="btn btn-outline-primary btn-block">
              <i className="far fa-save"></i>
              <span> Guardar</span>
            </button>
          </form>
        )}

        {/* Botón para cerrar el modal */}
        <button className="btn btn-secondary" onClick={closeModal}>
          Cerrar
        </button>
      </Modal>
    </div>
  );
};

export default CalendarioModal;
