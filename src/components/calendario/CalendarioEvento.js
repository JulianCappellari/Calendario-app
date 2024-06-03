// CalendarioEvento.jsx
import React from "react";

const CalendarioEvento = ({ evento }) => {
  const { titulo, usuario } = evento;

  return (
    <div>
      <strong>{titulo}</strong>
      <span>- {usuario && usuario.nombre}</span>
    </div>
  );
};

export default CalendarioEvento;
