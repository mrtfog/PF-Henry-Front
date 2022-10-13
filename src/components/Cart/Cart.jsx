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
import axios from "axios";

export default function Cart() {
  const { currentUser } = useAuth();
  const [total, setTotal] = useState();

  const history = useHistory();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer.cart);

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

  function handleOnClick(r) {
    if (!currentUser) {
      alert("To select your seats you need be logged in");
      history.push("/login");
    }
    dispatch(selectSeatsDisplay("flex"));
    dispatch(selectedReservation(r));
  }

  function handleOnClickReset() {
    dispatch(clearCart());
  }

  function handleOnClickDeleteMovie(showtimeId) {
    dispatch(clearCartByMovie(showtimeId));
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
                    onClick={() => handleOnClickDeleteMovie(r.showtimeId)}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ color: "#fff" }}>You haven't ticktes in your cart yet!</p>
        )}
      </div>

      <div className={style.footerBtn}>
        <div className={style.addCombo}>
          {/* <h3 style={{ color: "white" }}>Add combo</h3> */}
        </div>
        <div className={style.paymentGateway}>
          <form
            action={`http://localhost:8082/payment/payment?userId=${currentUser?.uid}`}
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
