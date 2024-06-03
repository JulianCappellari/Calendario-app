import { types } from "../types/types";

const estadoInicial = {
    modalAbierto: false
}

export const uiReducer = ( estado = estadoInicial, accion ) => {
    switch (accion.type) {
        case types.uiAbrirModal:
            
            return {
                ...estado,
                modalAbierto: true
            };
        case types.uiCerrarModal:
            
            return {
                ...estado,
                modalAbierto: false
            };
    
        default:
            return estado;
    }
}