import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    { value: "1", label: "Movie Theater 1" },
    { value: "2", label: "Movie Theather 2" },
    { value: "3", label: "Movie Theather 3" },
    { value: "4", label: "Movie Theather 4" },
  ];
  const formatOptions = [
    { value: "2D-Translated", label: "2D-Translated" },
    { value: "2D-Subtitled", label: "2D-Subtitled" },
    { value: "3D-Subtitled", label: "3D-Subtitled" },
    { value: "3D-Translated", label: "3D-Translated" },
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

        <div>

          <h1>Movie showtimes</h1>

          <div className={style.functions}>

            {functions.length > 0 ?
            functions.map(f =>{

              return(
                <div className={style.function}>

                  {/* traer poster de la peli y envolver todo en un div flex row, en la izquierda la img, en la derecha tda la info */}
                  <h3>{f.movieTitle}</h3>
                  <p><span>Date:</span> {new Date(f.dateTime).toLocaleString().replace(',',' -').substring(0, 17)}hs</p>
                    <p><span>Movie Theater:</span> {f.roomId}</p>
                    <p><span>Format:</span> {f.format}</p>

                </div>
              )
            }):
            
            <p>no hay</p>}

          </div>
          
        </div>

      </div>

      <div className={style.formFunction}>
        <h1>Create showtime</h1>
        <form onSubmit={handleSubmit}>
          <div className={style.Date}>
            <div className={style.minDivDate}>
              <label>Date {error.dateError && (<span className={style.error}>*Select date</span>)}</label>
              <DatePicker value={datePicker} onChange={setDatePicker} minDate={datePicker} />
            </div>
            
            <div className={style.minDivDate}>
              <label>Time</label>
              <TimePicker value={datePicker} onChange={setDatePicker} />
            </div>
            {error.dateError && (
              <span className={style.error}>error.dateError</span>
            )}
          </div>

          <div className={style.Select}>
            <label>Films on the billboard {error.movieIdError ? (<span className={style.error}> *{error.movieIdError}</span>) : null}</label>
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

          </div>
          <div className={style.Select}>
            <label>Select Room {error.roomIdError && (<span className={style.error}>*{error.roomIdError}</span>)}</label>
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
          </div>
          <div className={style.Select}>
            <label>Select Format {error.formatError && (<span className={style.error}>*{error.formatError}</span>)}</label>
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
          </div>
          <button disabled={Object.keys(error).length !== 0 ? true : false} type="submit">Create Showtime</button>
        </form>

      </div>
      
    </div>
  );
}