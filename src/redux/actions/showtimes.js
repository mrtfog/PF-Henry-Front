import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";


export function getAllShowtimes() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "https://pf-henry-back.herokuapp.com/showtime/getAll"
      );

      return dispatch({ type: "GET_SHOWTIMES", payload: data });
    } catch (e) {
      console.log(e);
      Swal.fire({
        title: 'Oops!',
        text: e.response.data,
        icon: "error",
        iconColor: "#497aa6",
        showCloseButton: true,
        confirmButtonText: "Accept",
        allowEnterKey: false,
        customClass: {
          popup: "Alert",
          closeButton: "closeButton",
          confirmButton: "confirmButton",
        },
      })
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
      Swal.fire({
        text: "Show created",
        icon: "success",
        iconColor: "#497aa6",
        showCloseButton: true,
        confirmButtonText: "Continue",
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
      })
      return dispatch({ type: "POST_SHOWTIME", payload: data });

      

    } catch (e) {
      console.log(e);
      Swal.fire({
        title: 'Oops!',
        text: e.response.data.slice(7),
        icon: "warning",
        iconColor: "#497aa6",
        showCloseButton: true,
        confirmButtonText: "Accept",
        allowEnterKey: false,
        customClass: {
          popup: "Alert",
          closeButton: "closeButton",
          confirmButton: "confirmButton",
        },
      })
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
      Swal.fire({
        title: 'Oops!',
        text: e.response.data,
        icon: "error",
        iconColor: "#497aa6",
        showCloseButton: true,
        confirmButtonText: "Accept",
        allowEnterKey: false,
        customClass: {
          popup: "Alert",
          closeButton: "closeButton",
          confirmButton: "confirmButton",
        },
      })
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
      Swal.fire({
        title: 'Oops!',
        text: e.response.data,
        icon: "error",
        iconColor: "#497aa6",
        showCloseButton: true,
        confirmButtonText: "Accept",
        allowEnterKey: false,
        customClass: {
          popup: "Alert",
          closeButton: "closeButton",
          confirmButton: "confirmButton",
        },
      })
    }
  };
}
