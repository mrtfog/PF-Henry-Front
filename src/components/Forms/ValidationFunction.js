// export default function validate (input){ // Recibe un OBJETO input, es decir nuestro estado.
//     let errors = {};
//     if (!input.movieId) errors.movieIdError = 'Es necesario seleccionar una película.';
//     if(!input.roomId) errors.roomIdError = 'Es necesario seleccionar una sala.'
//     if (!input.format) errors.formatError = 'Es necesario seleccionar un formato.'
//     if (!input.dateTime) errors.dateError = 'Es necesario seleccionar una fecha y hora.'
//     return errors
// }
export default function validate(values) {
  const errors = {};
  if (!values.movieId) {
    errors.movieId = "The movie option is required";
  }

  if (!values.roomId) {
    errors.roomId = " The movie theater option is required";
  }
  if (!values.format) {
    errors.format = "The format option is required";
  }

  if (!values.dateTime) {
    errors.dateTime = "The date and time options are required";
  }

  return errors;
}
