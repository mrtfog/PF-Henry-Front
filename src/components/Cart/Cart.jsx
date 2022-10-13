import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "../../scss/components/Cart/_cart.module.scss";
import {
  getCart,
  selectSeatsDisplay,
  selectedReservation,
  clearCart,
  clearCartByMovie,
} from "../../redux/actions/cart";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";

export default function Cart() {
  const { currentUser } = useAuth();
  const [total, setTotal] = useState();

  const querystring = window.location.search;
  const searchParams = new URLSearchParams(querystring);
  const status = searchParams.get("status");
  console.log(status);

  const history = useHistory();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer.cart);
  useEffect(() => {
    if (status === "failed") {
      handleOnPayment();
    }
  }, []);

  useEffect(() => {
    dispatch(getCart());
    validateConfirm(cart);
  }, []);
  useEffect(() => {
    setTotal(
      cart
        .reduce((acc, cur) => {
          return (acc = acc + cur.tickets * cur.ticketPrice);
        }, 0)
        .toFixed(2)
    );
  }, [cart]);
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
  function handleOnClick(r) {
    if (!currentUser) {
      Swal.fire({
        text: "To select your seats you need be logged in",
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
    }

    dispatch(selectSeatsDisplay("flex"));
    dispatch(selectedReservation(r));
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
        sessionStorage.clear()
        dispatch(clearCart());
      }
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
        dispatch(clearCartByMovie(showtime.showtimeId));
      }
    });
  }

  const validateConfirm = (cart) => {
    const bool = cart.length > 0 ? true : false;
    let seatsBool = true;

    if (cart.length) {
      for (const r of cart) {
        if (r.seatsId) {
          if (r.tickets !== r.seatsId.length) seatsBool = false;
        } else {
          seatsBool = false;
        }
      }
    }
    return bool && seatsBool;
  };
  // const handleSubmit = async (e) => {
  //   // e.preventDeafult();
  //   console.log(currentUser?.uid);
  //   const userUid = currentUser?.uid;
  //   const form = {
  //     title: toString(
  //       cart.length
  //         ? cart.map((r) => {
  //             return r.movieTitle;
  //           })
  //         : null
  //     ),
  //     price: total,
  //   };
  //   try {
  //     await axios.post("http://localhost:8082/payment/payment", form);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <div className={style.container_cart}>
      <div className={style.title}>
        <h2>My Cart</h2>
        <button className={style.clearCart} onClick={handleOnClickReset}>
          Clear cart
        </button>
      </div>

      <div className={style.cart}>
        {cart.length ? (
          cart.map((r) => {
            return (
              <div className={style.movies}>
                <img src={"https://image.tmdb.org/t/p/original" + r.image} />
                <h3>{r.movieTitle}</h3>
                <p>Movie Theater {r.room}</p>
                <p>
                  {r.format} • {r.tickets} tickets
                </p>
                <p>
                  {new Date(r.dateTime)
                    .toLocaleString()
                    .replace(",", " -")
                    .substring(0, 17)}
                  Hs
                </p>
                <div className={style.seatPicker}>
                  {r.seatsId ? (
                    <span>
                      Seats selected: <br /> {r.seatsId.join("-")}
                    </span>
                  ) : (
                    <button onClick={() => handleOnClick(r)}>
                      Select your seats
                    </button>
                  )}
                </div>
                <p>${Number(r.tickets) * r.ticketPrice}</p>

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
          <p style={{ color: "#fff" }}>You haven't got any ticktes in your cart yet!</p>
        )}
      </div>

      <div className={style.footerBtn}>
        <div className={style.addCombo}>
          {/* <h3 style={{ color: "white" }}>Add combo</h3> */}
        </div>
        <div className={style.paymentGateway}>
          <form
            action={`https://pf-henry-back.herokuapp.com/payment/payment?userId=${currentUser?.uid}`}
            method="POST"
          >
            {/* <form onSubmit={handleSubmit}> */}
            <input
              type="hidden"
              name="title"
              value={
                cart.length
                  ? cart.map((r) => {
                      return r.movieTitle;
                    })
                  : ""
              }
            ></input>
            <input type="hidden" name="price" value={total}></input>
            <h2>Total: ${total}</h2>
            <button
              type="submit"
              className={style.btn_finish}
              disabled={!validateConfirm(cart)}
            >
              Buy Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
