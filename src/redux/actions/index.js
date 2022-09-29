import axios from "axios";

export function getMovies() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:8082/api/popular");

      return dispatch({ type: "GET_MOVIES", payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getMovieDetail(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:8082/api/${id}`);

      return dispatch({ type: "GET_MOVIE_DETAIL", payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getMoviesByName(payload) {
  return {
    type: "GET_MOVIE_BY_NAME",
    payload,
  };
}

export function sortByName(payload) {
  return {
    type: "FILTER_BY_NAME",
    payload,
  };
}

//FUNCTION ACTIONS

export function getAllFunctions() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:8082/function/getAll");

      return dispatch({ type: "GET_FUNCTIONS", payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}
