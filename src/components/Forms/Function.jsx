import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getMovies } from "../../redux/actions";
import { getAllFunctions } from "../../redux/actions";
const initialState = {
  movieId: "",
  dateTime: "",
  roomId: "",
};
export default function Function() {
  const [form, setForm] = useState(initialState);
  const movies = useSelector((state) => state.movies);
  const functions = useSelector((state) => state.functions);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleDate = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies());
    dispatch(getAllFunctions());
  }, [dispatch]);
  useEffect(() => {
    setForm({ ...form, movieId: selectedMovie?.value });
    console.log(selectedMovie?.value);
  }, [selectedMovie]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Fecha</label>
        <input
          type="date"
          name="Date"
          value={form.dateTime}
          onChange={handleDate}
        />
        <label>Películas en cartelera</label>
        <Select
          defaultValue={selectedMovie}
          onChange={setSelectedMovie}
          options={
            movies.length &&
            movies.map((e) => {
              return { value: e._id, label: e.title };
            })
          }
        />
        <button type="submit">Create Function</button>
      </form>
    </div>
  );
}
