import moment from "moment"

// Modificar la fecha para que sea de tipo date
export const prepararEventos = ( eventos = [] ) => {
    return eventos.map(
    (evento) =>({
        ...evento,
        fechaInicio: moment(evento.fechaInicio).toDate(),
        fechaFin:moment(evento.fechaFin).toDate()
    })
    )
}