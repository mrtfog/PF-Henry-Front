
export default function validate (input){ // Recibe un OBJETO input, es decir nuestro estado.
    let errors = {};
    if (!input.movieId) errors.movieIdError = 'Es necesario seleccionar una película.';
    if(!input.roomId) errors.roomIdError = 'Es necesario seleccionar una sala.'
    if (!input.format) errors.formatError = 'Es necesario seleccionar un formato.'
    if (!input.dateTime) errors.dateError = 'Es necesario seleccionar una fecha y hora.'
    return errors
}