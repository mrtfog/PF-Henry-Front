import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../redux/actions/movies";
import { getAllShowtimes, logicDeleteShowtime, postShowtime } from "../../redux/actions/showtimes";
import { getAllRooms } from '../../redux/actions/rooms'
import { DatePicker, TimePicker } from "@material-ui/pickers";
import style from "../../scss/components/Forms/_function.module.scss";
import validate from "./ValidationFunction";
import Select from "./Select";
import { useFormik } from "formik";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";

export default function ShowTime() {
  const { currentUser } = useAuth();

  const movies = useSelector((state) => state.moviesReducer.movies);
  const functions = useSelector((state) => state.showtimesReducer.showtimes);
  const roomsBackend = useSelector((state) => state.roomReducer.rooms);

  const rooms = roomsBackend
    ? roomsBackend.map((e) => {
      const type =
        e.columns <= 10 ? "Small" : e.columns === 12 ? "Regular" : "Premiere";
      return { value: e._id, label: `Room N° ${e.number} - Size: ${type}` };
    })
    : [];

  const formatOptions = [
    { value: "2D-Translated", label: "2D-Translated" },
    { value: "2D-Subtitled", label: "2D-Subtitled" },
    { value: "3D-Subtitled", label: "3D-Subtitled" },
    { value: "3D-Translated", label: "3D-Translated" },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    if (!movies.length) dispatch(getMovies());
    if (!functions.length) dispatch(getAllShowtimes());
    if (!roomsBackend.length) dispatch(getAllRooms())
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      movieId: "",
      dateTime: null,
      roomId: "",
      format: "",
      ticketPrice: "",
    },

    validate,
    onSubmit: (values, { resetForm }) => {

      if (!dateValidation(functions, values)) {

        return Swal.fire({
          text: "The new showtime date-time must be at least 3 hours later than the last showtime of the selected room",
          icon: "error",
          iconColor: "#bf0d31",
          showCloseButton: true,
          confirmButtonText: "Try again",
          allowEnterKey: false,
          customClass: {
            popup: "Alert",
            closeButton: "closeButton",
            confirmButton: "confirmButton",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            document.getElementById("functionsDiv").scrollTo(0, -1000000);
          }
        });

      }
      dispatch(postShowtime(values, currentUser));
      resetForm({ values: "" });
    },
  });

  function handleDelete(e, f) {
    Swal.fire({
      title: "Are you sure you want to delete this showtime?",
      html: `<div>
        <p><span style='font-weight: 700;'>Movie:</span> ${f.movieTitle}</p>
        <p><span style='font-weight: 700;'>DateTime:</span> ${new Date(
        f.dateTime
      )
          .toLocaleString()
          .replace(",", " -")
          .substring(0, 17)}hs</p>
        <p><span style='font-weight: 700;'>Movie Theater:</span> ${f.roomId ? rooms.find((r) => r.value === f.roomId).label : ""
        }</p>
        <p><span style='font-weight: 700;'>Format:</span> ${f.format}</p>
      </div>`,
      icon: "question",
      iconColor: "#497aa6",
      showCloseButton: true,
      showDenyButton: true,
      confirmButtonText: "Yes, I am sure",
      denyButtonText: "No, cancel delete",
      allowEnterKey: false,
      customClass: {
        popup: "Alert",
        closeButton: "closeButton",
        confirmButton: "confirmButton",
        denyButton: "denyButton",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const showtimeId = f._id;
        dispatch(logicDeleteShowtime(showtimeId, currentUser));
      }
    });
  }



  return (
    <div className={style.container}>
      <div className={style.functions_container}>

        <div>
          <h2>Movie showtimes</h2>

          <div className={style.functions} id="functionsDiv">
            {functions.length && roomsBackend.length ? (
              functions.map((f, index) => {
                return (
                  <div key={index} className={style.function}>
                    <div>
                      <button
                        className={style.closeBtn}
                        onClick={(e) => handleDelete(e, f)}
                      >
                        X
                      </button>
                      <img
                        src={"https://image.tmdb.org/t/p/original" + f.image}
                        alt={`Poster movie of ${f.movieTitle}`}
                      />
                    </div>
                    <div>
                      <h3>{f.movieTitle}</h3>
                      <p>
                        <span>Date:</span> <br />
                        {new Date(f.dateTime)
                          .toLocaleString()
                          .replace(",", " -")
                          .substring(0, 17)}
                        hs
                      </p>
                      <p>
                        <span>Movie Theater:</span>
                        <br />
                        {f.roomId
                          ? rooms.find((r) => r.value === f.roomId).label
                          : ""}
                      </p>
                      <p>
                        <span>Format:</span>
                        <br /> {f.format}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={style.notFound}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <path
                    fill="#2a3a3e"
                    d="m47.8 0-3.06.68 3.79 2.65zM23.55 15.53h-5.12l-3.22 3.52h5.12zM50.05 15.64l-3.13 3.41h3.13zM47.33 15.53h-5.12l-3.22 3.52h5.12zM39.4 15.53h-5.12l-3.22 3.52h5.12zM31.48 15.53h-5.12l-3.22 3.52h5.12zM45.9 4.02 42 1.29 37 2.4l3.91 2.74zM38.17 5.74l-3.91-2.73-5 1.11 3.9 2.73zM30.42 7.47l-3.9-2.74-4.99 1.11 3.9 2.73zM22.69 9.18l-3.91-2.73-4.99 1.12 3.91 2.72zM14.95 10.9l-3.9-2.72-4.99 1.11 3.89 2.72zM3.46 10l.83 3.27 2.93-.65zM4.57 18.95l3.12-3.42H4.57zM15.62 15.53h-5.11l-3.22 3.52h5.11zM35.24 31.72c-.02-.49.2-.95.58-1.26.38-.3.9-.4 1.38-.27 4.15 1.19 8.42 1.69 12.86 1.52V21.12H4.57V48.1h12.09c.02-.12.06-.24.11-.34.22-.45.64-.76 1.13-.84 6.35-1.08 12.46-3.75 18.18-7.88-.56-3.1-.77-5.82-.84-7.32z"
                  />
                  <path
                    fill="#2a3a3e"
                    d="M51.13 33.72c-.02 0-.03.01-.04.01-.01 0-.02-.01-.03-.01-4.75.26-9.34-.18-13.71-1.35.27 4.1 1.66 17.08 8.55 20.91a6.229 6.229 0 0 0 6.09 0c6.92-3.83 8.28-16.87 8.55-20.96-3.2.77-6.34 1.24-9.41 1.4zm-9.08 6.78c-.02.02-.06.05-.09.07-.19.13-.38.2-.59.2-.32 0-.62-.14-.83-.41-.34-.46-.25-1.1.19-1.45 1.49-1.18 3.71-1.62 5.46-1.09.03.01.09.03.13.04.54.18.82.75.64 1.28-.17.54-.76.84-1.29.68-1.19-.36-2.69-.07-3.62.68zm11.91 6.48c-.56.94-1.55 1.76-2.88 2.36-.59.28-1.35.41-2.1.41-.8 0-1.6-.16-2.23-.46-1.31-.64-2.3-1.48-2.83-2.43-.28-.5-.1-1.13.39-1.41.5-.28 1.13-.1 1.41.39.23.4.75 1.01 1.93 1.58.65.32 1.91.33 2.57.03 1.19-.55 1.72-1.14 1.96-1.54.29-.49.93-.65 1.42-.36.48.3.65.94.36 1.43zm2.18-6.21c-.2 0-.4-.06-.59-.2a.705.705 0 0 1-.09-.07c-.93-.75-2.43-1.04-3.6-.67-.55.16-1.13-.13-1.3-.68-.17-.54.11-1.11.64-1.28.04-.01.1-.03.13-.04 1.75-.53 3.97-.09 5.46 1.09.43.35.53.99.19 1.45-.21.25-.52.4-.84.4zM39.2 48.76c-1.13-.29-2.56.01-3.49.76-.43.35-1.1.3-1.45-.13-.36-.43-.32-1.07.1-1.44.03-.02.08-.06.11-.08.98-.8 2.36-1.24 3.73-1.26a36.9 36.9 0 0 1-1.66-5.34c-5.55 3.86-11.44 6.42-17.56 7.59 2.02 3.58 8.9 14.68 16.76 15.15 2.17.11 4.22-.86 5.48-2.64 1.3-1.83 1.98-4.33 2.01-7.38-1.66-1.39-2.98-3.2-4.03-5.23zm-9.22 3.1c-1.22.11-2.5.94-3.08 1.98l-.07.11c-.11.19-.28.32-.47.4-.29.11-.63.09-.93-.08-.48-.28-.64-.91-.36-1.4.93-1.67 2.83-2.9 4.64-3.08.04 0 .1-.01.13-.01.57-.04 1.05.39 1.09.95.04.57-.38 1.06-.95 1.13zm8.72 6.33c-.85 1.03-2.57 1.83-3.9 1.83h-.02c-1.46-.01-2.7-.34-3.59-.97a1.02 1.02 0 0 1-.26-1.44c.33-.47.97-.58 1.44-.26.38.27 1.12.59 2.42.6h.01c.72 0 1.85-.53 2.32-1.09.83-1 1.06-1.77 1.1-2.24.05-.57.55-.99 1.12-.94.57.05.99.56.94 1.13-.09 1.09-.63 2.26-1.58 3.38z"
                  />
                </svg>
                <p>There are not showtimes</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={style.formFunction}>
        <h2>Create new movie</h2>

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

              <div className={style.minDivTime}>
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
              options={rooms}
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
              label="Select format"
              value={formik.values.format}
              options={formatOptions}
              onChange={(e) => formik.setFieldValue("format", e.target.value)}
            />
          </div>
          <div className={style.inputNumber}>
            <label>Select price</label>
            <input
              onChange={(e) => {
                formik.setFieldValue("ticketPrice", e.target.value);
              }}
              value={formik.values.ticketPrice}
              type="number"
              step=".01"
              min="1"
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


function dateValidation(functions, values) {

  const filteredFunctions = functions.filter(f => f.roomId === values.roomId && new Date(f.dateTime).toDateString() === new Date(values.dateTime).toDateString())
  const lastDate = getLastDate(filteredFunctions)

  if (lastDate) {
    return threeHourGap(lastDate, values.dateTime)
  }

  return true

}

function getLastDate(functions) {

  if (!functions.length) return undefined

  let lastDate = new Date(functions[0].dateTime)

  for (const showtime of functions) {

    if (lastDate < new Date(showtime.dateTime)) {
      lastDate = new Date(showtime.dateTime)
    }

  }

  return lastDate

}

function threeHourGap(lastDateInput, newDateInput) {

  const lastDate = new Date(lastDateInput)
  const newDate = new Date(newDateInput)

  const dayInterval = (lastDate.getTime() - newDate.getTime()) / (1000 * 60 * 60)

  return (dayInterval <= -3)

}
