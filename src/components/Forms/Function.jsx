import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getMovies } from "../../redux/actions";
import { getAllFunctions } from "../../redux/actions";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import style from "../../scss/components/Forms/_function.module.scss";
import { postFunction } from "../../redux/actions/index";
import validate from './ValidationFunction'



export default function Function() {
  const movies = useSelector((state) => state.movies);
  const functions = useSelector((state) => state.functions);

  const [datePicker, setDatePicker] = useState(new Date());

  const [input, setInput] = useState({
    movieId: undefined,
    dateTime: datePicker,
    roomId:  undefined,
    format:  undefined,
  })
  const [error, setError] = useState({});

  const roomOptions = [
    { value: "1", label: "sala 1" },
    { value: "2", label: "sala 2" },
    { value: "3", label: "sala 3" },
    { value: "4", label: "sala 4" },
  ];
  const formatOptions = [
    { value: "2D-Doblado", label: "2D-Doblado" },
    { value: "2D-Subtitulada", label: "2D-Subtitulada" },
    { value: "3D-Subtitulada", label: "3D-Subtitulada" },
    { value: "3D-Doblado", label: "3D-Doblado" },
  ];


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies());
    dispatch(getAllFunctions());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    input.movieId = Number(input.movieId)
    input.dateTime = datePicker
    dispatch(postFunction(input));
    alert("Show created")
    setInput({
      movieId: "",
      dateTime: datePicker,
      roomId: "",
      format: "",
    })
    dispatch(getAllFunctions());

  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })


    setError(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    setError(validate(input))
  }, [])


  return (
    <div className={style.container}>

      <div className={style.functions_container}>

        <h1>Functions</h1>

        <div className={style.functions}>

          {functions.length > 0 ?
          functions.map(f =>{

            return(
              <div className={style.function}>

                {/* traer poster de la peli y envolver todo en un div flex row, en la izquierda la img, en la derecha tda la info */}
                <h3>{f.movieTitle}</h3>
                <p>Date: {new Date(f.dateTime).toLocaleString().replace(',',' -')}</p>
                <div className={style.room_and_format}>
                  <p>Room: {f.roomId}</p>
                  <p>Format: {f.format}</p>
                </div>

              </div>
            )
          }):
          
          <p>no hay</p>}

        </div>

      </div>

      <div className={style.formFunction}>
        <h1>Create new movie</h1>
        <form onSubmit={handleSubmit}>
          <div className={style.Date}>
            <div className={style.minDivDate}>
              <label>Date</label>
              <DatePicker value={datePicker} onChange={setDatePicker} minDate={datePicker} />
            </div>
            {error.dateError && (
              <span className={style.error}>Select date</span>
            )}
            <div className={style.minDivDate}>
              <label>Time</label>
              <TimePicker value={datePicker} onChange={setDatePicker} />
            </div>
            {error.dateError && (
              <span className={style.error}>error.dateError</span>
            )}
          </div>

          <div className={style.Select}>
            <label>Films on the billboard</label>
            <div>
            <select value={input.movieId} name="movieId" onChange={e => handleChange(e)}>
              <option  value="" disabled selected hidden>Select movie</option>
                  {
                  movies.map((movie) => {
                    return (
                    <option value={movie._id}>{movie.title}</option>)})
                  }
            </select>
            </div>
            {error.movieIdError ? (
              <span className={style.error}>{error.movieIdError}</span>
            ) : null}
          </div>
          <div className={style.Select}>
            <label>Seleccione sala</label>
            <div>
            <select value={input.roomId} name="roomId" onChange={e => handleChange(e)}>
            <option value="" disabled selected hidden>Select room</option>
                  {
                  roomOptions.map((room) => {
                    return (
                    <option value={room.value}>{room.label}</option>)})
                  }
            </select>
            </div>
            {error.roomIdError && (
              <span className={style.error}>{error.roomIdError}</span>
            )}
          </div>
          <div className={style.Select}>
            <label>Seleccione formato</label>
            <div>
            <select value={input.formatId} name="format" onChange={e => handleChange(e)}>
            <option value="" disabled selected hidden>Select format</option>
                  {
                  formatOptions.map((formato) => {
                    return (
                    <option value={formato.value}>{formato.label}</option>)})
                  }
            </select>
            </div>
            {error.formatError && (
              <span className={style.error}>{error.formatError}</span>
            )}
          </div>
          <button disabled={Object.keys(error).length !== 0 ? true : false} type="submit">Crear Función</button>
        </form>

      </div>
      
    </div>
  );
}