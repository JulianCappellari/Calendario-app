import React from 'react'
import { useDispatch } from 'react-redux';
import { eliminarEventoDB } from '../../actions/eventos';

const EliminarEvento = () => {
    const dispach = useDispatch();

    const handleEliminar = ( e) => {
        e.preventDefault()
        console.log('Manejador de eliminación ejecutado');
        dispach(eliminarEventoDB())
    }
   return (
    <button className='btn btn-danger btn-eliminar' onClick={handleEliminar}>
        <i className='fas fa-trash'></i>
        <span> Borrar Evento </span>
    </button>
  )
}

export default EliminarEvento
