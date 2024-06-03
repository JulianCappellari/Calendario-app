import { types } from "../types/types";



const estadoInicial = {
    checking: true,
    // uid: null,
    // nombre: null,
}

export const authReducers = (estado = estadoInicial, accion) =>{ 
    switch (accion.type) {
        case types.authLogin:
            
            return{
                ...estado,
                checking: false,
                ...accion.payload
            };
        case types.authChekingFinalizado:
            return {
                ...estado,
                checking: false
            }
        case types.authlogout:
            return {
                checking: false
            }
    
        default:
            return estado;
    }
}
