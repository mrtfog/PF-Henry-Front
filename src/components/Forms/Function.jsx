import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../redux/actions/movies";
import { getAllShowtimes, postShowtime } from "../../redux/actions/showtimes";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import style from "../../scss/components/Forms/_function.module.scss";
import validate from "./ValidationFunction";
import Select from "./Select";
import { useFormik } from "formik";

export default function Function() {
  const movies = useSelector((state) => state.moviesReducer.movies);
  const functions = useSelector((state) => state.showtimesReducer.showtimes);
  const roomOptions = [
    { value: "1", label: "Movie theater 1" },
    { value: "2", label: "Movie theater 2" },
    { value: "3", label: "Movie theater 3" },
    { value: "4", label: "Movie theater 4" },
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
    dispatch(getAllShowtimes());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      movieId: "",
      dateTime: null,
      roomId: "",
      format: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      dispatch(postShowtime(values));
      alert("Show created");
      dispatch(getAllShowtimes());
      resetForm({
        values: "",
      });
    },
  });

  useEffect(()=>{

    document.getElementById('functionsDiv').scrollTo(0, -1000000)

  }, [functions])

  return (
    <div className={style.container}>
      <div className={style.functions_container}>
        <div>
          <h1>Movie showtimes</h1>

          <div className={style.functions} id='functionsDiv'>
            {functions.length > 0 ? (
              functions.map((f, index) => {

                return (
                  <div key={index} className={style.function}>

                    <div>
                      <img src={'https://image.tmdb.org/t/p/original' + f.image} />
                    </div>
                    <div>
                      <h3>{f.movieTitle}</h3>
                      <p>
                        <span>Date:</span>{" "}
                        <br/>
                        {new Date(f.dateTime).toLocaleString().replace(",", " -").substring(0, 17)}hs
                      </p>
                      <p>
                        <span>Movie Theater:</span><br/>{f.roomId}
                      </p>
                      <p>
                        <span>Format:</span><br/> {f.format}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>no hay</p>
            )}
          </div>
        </div>
      </div>

      <div className={style.formFunction}>
        <h1>Create new movie</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className={style.mainDivDate}>
            <label>
              Release Date
              {formik.errors.dateTime ? (
                <span className={style.error}> *{formik.errors.dateTime}</span>
              ) : null}
            </label>
            <div className={style.Date}>
              <div className={style.minDivDate}>
                <label>Date</label>

                <DatePicker
                  name="dateTime"
                  emptyLabel="Select a date"
                  value={formik.values.dateTime}
                  onChange={(value) => {
                    formik.setFieldValue("dateTime", value);
                  }}
                  minDate={new Date()}
                />
              </div>

              <div className={style.minDivDate}>
                <label>Time</label>
                <TimePicker
                  emptyLabel="Select time"
                  value={formik.values.dateTime}
                  onChange={(value) => {
                    formik.setFieldValue("dateTime", value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className={style.Select}>
            {/* <label>Films on the billboard</label> */}
            <label>
              Films on the billboard
              {formik.errors.movieId ? (
                <span className={style.error}> *{formik.errors.movieId}</span>
              ) : null}
            </label>
            <Select
              name="movieId"
              label="Select a movie"
              value={formik.values.movieId}
              options={movies.map((movie) => {
                return { value: movie._id, label: movie.title };
              })}
              onChange={(e) =>
                formik.setFieldValue("movieId", Number(e.target.value))
              }
            />
          </div>
          <div className={style.Select}>
            <label>
              Movie theater{" "}
              {formik.errors.roomId ? (
                <span className={style.error}> *{formik.errors.roomId}</span>
              ) : null}
            </label>
            <Select
              name="roomId"
              label="Select a movie theater"
              value={formik.values.roomId}
              options={roomOptions}
              onChange={(e) => formik.setFieldValue("roomId", e.target.value)}
            />
          </div>
          <div className={style.Select}>
            <label>
              Format{" "}
              {formik.errors.format ? (
                <span className={style.error}> *{formik.errors.format}</span>
              ) : null}
            </label>
            <Select
              name="format"
              label="Select a format"
              value={formik.values.format}
              options={formatOptions}
              onChange={(e) => formik.setFieldValue("format", e.target.value)}
            />
          </div>
          <button
            disabled={Object.keys(formik.errors).length !== 0 ? true : false}
            type="submit"
          >
            Create Function
          </button>
        </form>
      </div>
    </div>
  );
}
