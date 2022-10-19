import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getReservations,
  clearNewReservations,
  getCart,
  deleteReservationBack,
} from "../../redux/actions/cart";
import { getAllShowtimes } from "../../redux/actions/showtimes";
import { getAllRooms } from "../../redux/actions/rooms";
import {
  selectSeatsDisplay,
  selectedReservation,
  clearCart,
  clearCartByMovie,
} from "../../redux/actions/cart";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import style from "../../scss/components/Cart/_cart.module.scss";

const NewCart = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const querystring = window.location.search;
  const searchParams = new URLSearchParams(querystring);
  const status = searchParams.get("status");

  const [total, setTotal] = useState();

  let reservations = useSelector((state) => state.cartReducer.newReservations);
  const newCart = useSelector((state) => state.cartReducer.newCart);
  const showtimes = useSelector((state) => state.showtimesReducer.showtimes);
  const rooms = useSelector((state) => state.roomReducer.rooms);

  if (!currentUser)
    reservations = JSON.parse(sessionStorage.getItem("newCart"));

  useEffect(() => {
    if (currentUser) dispatch(getReservations(currentUser.accessToken));
    else dispatch(getCart());
    dispatch(getAllShowtimes());
    if (!rooms.length) dispatch(getAllRooms());

    return () => dispatch(clearNewReservations());
  }, []);

  useEffect(() => {
    if (currentUser) dispatch(getReservations(currentUser.accessToken));
  }, [newCart]);

  function handleOnClick(r) {
    if (!currentUser) {
      Swal.fire({
        text: "To select your seats you need to be logged in",
        icon: "info",
        iconColor: "#497aa6",
        showCloseButton: true,
        showDenyButton: true,
        denyButtonText: "Continue",
        confirmButtonText: "Log In",
        allowEnterKey: false,
        customClass: {
          popup: "Alert",
          closeButton: "closeButton",
          confirmButton: "confirmButton",
          denyButton: "denyButton",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          history.push(`/login`);
        }
      });
    } else {
      dispatch(selectSeatsDisplay("flex"));
      dispatch(selectedReservation(r));
    }
  }

  const displayReservations = reservations.length
    ? reservations.map((r) => {
        const reservShowtime = showtimes
          ? showtimes.find((s) => s._id.toString() === r.showtimeId)
          : undefined;
        const reservRoom = reservShowtime
          ? rooms.find((r) => reservShowtime.roomId === r._id.toString())
          : undefined;

        if (reservShowtime && reservRoom) {
          return {
            reservationId: r._id ? r._id.toString() : undefined,
            price: r.price,
            title: reservShowtime.movieTitle,
            image: reservShowtime.image,
            format: reservShowtime.format,
            dateTime: reservShowtime.dateTime,
            roomNumber: reservRoom.number || undefined,
            roomId: reservShowtime.roomId,
            showtimeId: r.showtimeId,
            ticketAmount: r.ticketAmount,
            seats: reservShowtime.seats,
            seatLocations: r.seatLocations,
          };
        }
      })
    : [];

  useEffect(() => {
    if (reservations.length)
      setTotal(
        reservations.reduce((acc, cur) => (acc += cur.price), 0).toFixed(2)
      );
  }, [reservations]);
  useEffect(() => {
    if (status === "failed") {
      handleOnPayment();
    }
  }, []);

  function handleOnPayment() {
    Swal.fire({
      title: "Transaction failed",
      text: "Please try again",
      icon: "error",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      showCloseButton: true,
      showDenyButton: false,
      denyButtonText: false,
      confirmButtonText: "Continue",
      allowEnterKey: false,
      customClass: {
        popup: "Alert",
        closeButton: "closeButton",
        confirmButton: "confirmButton",
        denyButton: "denyButton",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        return;
      }
    });
  }

  function handleOnClickReset() {
    Swal.fire({
      text: "Are you sure you want to clear the cart?",
      icon: "question",
      iconColor: "#497aa6",
      showCloseButton: true,
      showDenyButton: true,
      denyButtonText: "Cancel",
      confirmButtonText: "Yes, I am sure",
      allowEnterKey: false,
      customClass: {
        popup: "Alert",
        closeButton: "closeButton",
        confirmButton: "confirmButton",
        denyButton: "denyButton",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (!currentUser) {
          sessionStorage.newCart = JSON.stringify([]);
          dispatch(clearCart());
        } else {
          dispatch(clearNewReservations(currentUser.accessToken));
        }
      }
      setTotal(0);
    });
  }

  function handleOnClickDeleteMovie(showtime) {
    Swal.fire({
      text: `Are you sure you want to remove '${showtime.movieTitle}' from your cart?`,
      icon: "question",
      iconColor: "#497aa6",
      showCloseButton: true,
      showDenyButton: true,
      denyButtonText: "No, go back to cart",
      confirmButtonText: "Yes, I am sure",
      allowEnterKey: false,
      customClass: {
        popup: "Alert",
        closeButton: "closeButton",
        confirmButton: "confirmButton",
        denyButton: "denyButton",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (currentUser)
          dispatch(
            deleteReservationBack(
              { reservationId: showtime.reservationId },
              currentUser.accessToken
            )
          );
        if (!currentUser) {
          dispatch(clearCartByMovie(showtime.showtimeId));
          let sessionNewCart = JSON.parse(sessionStorage.newCart).filter(
            (r) => r.showtimeId !== showtime.showtimeId
          );

          sessionStorage.newCart = JSON.stringify(sessionNewCart);
        }
      }
    });
  }

  const validateConfirm = (displayReservations) => {
    const bool = displayReservations
      ? displayReservations.length > 0
        ? true
        : false
      : null;
    let seatsBool = true;

    if (displayReservations && displayReservations.length) {
      for (const r of displayReservations) {
        if (r.seatLocations) {
          if (r.ticketAmount !== r.seatLocations.length) seatsBool = false;
        } else {
          seatsBool = false;
        }
      }
    }
    return bool && seatsBool;
  };

  //////////////// componente ///////////////////////////////////////////

  if (showtimes.length && displayReservations && rooms.length) {
    return (
      <div className={style.container_cart}>
        <div className={style.title}>
          <h2>My Cart</h2>
          <button className={style.clearCart} onClick={handleOnClickReset}>
            Clear cart
          </button>
        </div>

        <div className={style.cart}>
          {displayReservations ? (
            displayReservations.length ? (
              displayReservations.map((r) => {
                let date = new Date(r.dateTime)
                  .toLocaleString()
                  .replace(",", " -");

                return (
                  <div className={style.movies}>
                    <img
                      src={"https://image.tmdb.org/t/p/original" + r.image}
                    />
                    <h3>{r.title}</h3>
                    <p>Movie Theater {r.roomNumber}</p>
                    <p>
                      {r.format} • {r.ticketAmount} tickets
                    </p>
                    <p>{date.substring(0, date.length - 3)} Hs</p>
                    <div className={style.seatPicker}>
                      {currentUser ? (
                        r.seatLocations.length ? (
                          <span>
                            {" "}
                            Seats selected: <br /> {r.seatLocations.join("-")}
                          </span>
                        ) : (
                          <button onClick={() => handleOnClick(r)}>
                            Select your seats
                          </button>
                        )
                      ) : (
                        <button onClick={() => handleOnClick(r)}>
                          Select your seats
                        </button>
                      )}
                    </div>
                    <p>${Number(r.price)}</p>

                    <div>
                      <button
                        className={style.delete}
                        onClick={() => handleOnClickDeleteMovie(r)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ color: "#fff" }}>
                You have not got any ticktes in your cart yet!
              </p>
            )
          ) : null}
        </div>

        <div className={style.footerBtn}>
          <div className={style.paymentGateway}>
            <form
              action={`https://pf-henry-back.herokuapp.com/payment/payment?userId=${currentUser?.uid}`}
              // action={`http://localhost:8082/payment/payment?userId=${currentUser?.uid}`}
              method="POST"
            >
              <input
                type="hidden"
                name="name"
                value={currentUser?.displayName}
              ></input>
              <input
                type="hidden"
                name="email"
                value={currentUser?.email}
              ></input>
              <input
                type="hidden"
                name="title"
                value={
                  displayReservations
                    ? displayReservations.length
                      ? displayReservations.map((r) => r.title)
                      : ""
                    : null
                }
              ></input>
              <input type="hidden" name="price" value={total}></input>
              <h2>Total: ${total}</h2>
              <button
                type="submit"
                className={style.btn_finish}
                disabled={!validateConfirm(displayReservations)}
              >
                Buy Now
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Empty Cart</p>;
  }
};

export default NewCart;
