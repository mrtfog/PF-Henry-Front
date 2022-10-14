import axios from "axios";

export function getAllShowtimes() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "https://pf-henry-back.herokuapp.com/showtime/getAll"
      );

      return dispatch({ type: "GET_SHOWTIMES", payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function postShowtime(values, currentUser) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "https://pf-henry-back.herokuapp.com/showtime/post",
        values,
        { headers: { user: currentUser.accessToken } }
      );

      return dispatch({ type: "POST_SHOWTIME", payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getBillboardMovies(movies) {
  return async (dispatch) => {
    try {
      const promises = movies.map(async (id) => {
        let { data } = await axios.get(
          `https://pf-henry-back.herokuapp.com/api/${id}`
        );
        return data;
      });

      let promiseAll = await Promise.all(promises);

      return dispatch({ type: "GET_BILLBOARD_MOVIES", payload: promiseAll });
    } catch (e) {
      console.log(e);
    }
  };
}

export function logicDeleteShowtime(id, currentUser) {
  return async (dispatch) => {
    try {
      await axios.delete(
        `https://pf-henry-back.herokuapp.com/showtime/endById/${id}`,
        { headers: { user: currentUser.accessToken } }
      );

      return dispatch({ type: "DELETE_SHOWTIME", payload: id });
    } catch (e) {
      console.log(e);
    }
  };
}
