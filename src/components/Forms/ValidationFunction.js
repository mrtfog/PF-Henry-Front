
export default function validate (input){ // Recibe un OBJETO input, es decir nuestro estado.
    let errors = {};
    if (!input.movieId) errors.movieIdError = "A movie is required";
    if(!input.roomId) errors.roomIdError = 'A movie theater is required'
    if (!input.format) errors.formatError = 'A format is required'
    if (!input.dateTime) errors.dateError = 'A time and date is required'
    return errors
}