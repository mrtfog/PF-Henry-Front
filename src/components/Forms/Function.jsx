import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getMovies } from "../../redux/actions";
import { getAllFunctions } from "../../redux/actions";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import style from "../../scss/components/Forms/_function.module.scss";
import { postFunction } from "../../redux/actions/index";

const initialState = {
  movieId: null,
  dateTime: null,
  roomId: null,
  format: null,
};
const errors = {
  movieIdError: false,
  dateTimeError: false,
  roomIdError: false,
  formatError: false,
};
export default function Function() {
  const [form, setForm] = useState(initialState);
  const movies = useSelector((state) => state.movies);
  const functions = useSelector((state) => state.functions);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [datePicker, setDatePicker] = useState(new Date());
  const [error, setError] = useState(errors);

  // const cleanSelect = () => {
  //   setSelectedFormat([]);
  //   setSelectedMovie([]);
  //   setSelectedRoom([]);
  // };
  const validate = () => {
    if (
      !form.dateTime &&
      !form.roomId &&
      !form.movieId &&
      form.format === undefined
    ) {
      setError({
        movieIdError: true,
        dateTimeError: true,
        roomIdError: true,
        formatError: true,
      });
      return true;
    }
    if (Object.values(error).includes(true)) return true;
    // if (form.dateTime === null || form.dateTime === undefined) {
    //   setError({ ...errors, dateTimeError: true });
    // }
    // if (selectedMovie === null) {
    //   setError({ ...errors, movieIdError: true });
    // }

    // if (selectedRoom === null) {
    //   setError({ ...errors, roomIdError: true });
    // }
    // if (selectedFormat === null) {
    //   setError({ ...errors, formatError: true });
    // }

    if (
      form.dateTime &&
      form.roomId &&
      form.movieId &&
      form.format !== undefined
    ) {
      return false;
    }
    return true;
  };
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
  useEffect(() => {
    setForm({
      ...form,
      movieId: selectedMovie?.value,
    });
    setError({ ...error, movieIdError: false });
  }, [selectedMovie]);
  useEffect(() => {
    setForm({ ...form, dateTime: datePicker });
    setError({ ...error, dateTimeError: false });
  }, [datePicker]);
  useEffect(() => {
    setForm({ ...form, roomId: selectedRoom?.value });
    setError({ ...error, roomIdError: false });
  }, [selectedRoom]);
  useEffect(() => {
    setForm({ ...form, format: selectedFormat?.value });
    setError({ ...error, formatError: false });
  }, [selectedFormat]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate() === true) return;
    console.log(form);
    // dispatch(postFunction(form));
    setSelectedFormat(null);
    setSelectedMovie(null);
    setSelectedRoom(null);
    setDatePicker(new Date());
    setForm(initialState);

    alert("Función creada exitosamente!");
  };
  return (
    <div className={style.formFunctionContainer}>
      <h1>Registre una nueva función</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.Date}>
          <div className={style.minDivDate}>
            <label>Fecha</label>
            <DatePicker value={datePicker} onChange={setDatePicker} />
          </div>
          <div className={style.minDivDate}>
            <label>Hora</label>
            <TimePicker value={datePicker} onChange={setDatePicker} />
          </div>
          {error.dateTimeError && (
            <span className={style.error}>Seleccione fecha y hora</span>
          )}
        </div>

        <div className={style.Select}>
          <label>Películas en cartelera</label>
          <div>
            <Select
              isClearable={true}
              defaultValue={selectedMovie}
              onChange={setSelectedMovie}
              options={
                movies.length &&
                movies.map((e) => {
                  return { value: e._id, label: e.title };
                })
              }
            />
          </div>
          {error.movieIdError && (
            <span className={style.error}>Seleccione una película</span>
          )}
        </div>
        <div className={style.Select}>
          <label>Seleccione sala</label>
          <div>
            <Select
              isClearable={true}
              defaultValue={selectedRoom}
              onChange={setSelectedRoom}
              options={roomOptions}
            />
          </div>
          {error.roomIdError && (
            <span className={style.error}>Seleccione una sala</span>
          )}
        </div>
        <div className={style.Select}>
          <label>Seleccione formato</label>
          <div>
            <Select
              isClearable={true}
              defaultValue={selectedFormat}
              onChange={setSelectedFormat}
              options={formatOptions}
            />
          </div>
          {error.formatError && (
            <span className={style.error}>Seleccione un formato</span>
          )}
        </div>

        <button type="submit">Crear Función</button>
      </form>
    </div>
  );
}
