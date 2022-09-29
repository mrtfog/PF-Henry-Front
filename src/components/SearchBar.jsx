import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getMoviesByName } from "../redux/actions/index";

import style from "../scss/components/_searchbar.module.scss";

function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getMoviesByName(name));
  }, [name, dispatch]);

  function handleSearchBar(e) {
    console.log(e.target);
    setName(e.target.value);
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
          placeholder="Nombre de una película"
          onChange={handleSearchBar}
        />
      </form>
    </div>
  );
}

export default SearchBar;
