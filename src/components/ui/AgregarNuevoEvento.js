import React from 'react';
import { useDispatch } from 'react-redux';
import { uiAbrirModal } from '../../actions/ui';

const AgregarNuevoEvento = () => {
  const dispatch = useDispatch();

  const handleClickNuevo = () => {
    dispatch(uiAbrirModal());
  };

  return (
    <button className='btn btn-primary fab' onClick={handleClickNuevo}>
      <i className='fas fa-plus'></i>
    </button>
  );
};

export default AgregarNuevoEvento;
