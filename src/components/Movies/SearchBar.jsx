import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getMoviesByName } from "../../redux/actions/movies";

import style from "../../scss/components/Movies/_searchbar.module.scss";

function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handleSearchBar(e) {
    setName(e.target.value);
    dispatch(getMoviesByName(e.target.value));

  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getMoviesByName(name));
    setName("");
  }
  return (
    <div className={style.searchContainer}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className={style.inputSearch}
          type="text"
          value={name}
          placeholder="What are you searching for?"
          onChange={handleSearchBar}
        />
      </form>
    </div>
  );
}

export default SearchBar;
