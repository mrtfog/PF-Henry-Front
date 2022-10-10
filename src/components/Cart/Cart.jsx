import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "../../scss/components/Cart/_cart.module.scss";
import { getCart, selectSeatsDisplay, selectedReservation } from "../../redux/actions/cart";

export default function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer.cart);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  function handleOnClick(r){

    dispatch(selectSeatsDisplay('flex'))
    dispatch(selectedReservation(r))

  }


  return (
    <div className={style.container_cart}>
      <div className={style.title}>
        <h2>My Cart</h2>
        <button className={style.clearCart}>Clear cart</button>
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
                <button onClick={() => handleOnClick(r)}> Pick your seats </button>
                <p>Amount</p>

                <div>
                  <button className={style.delete}>X</button>
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
          <h3 style={{ color: "white" }}>Add combo</h3>
        </div>
        <div className={style.paymentGateway}>
          <form action="http://localhost:8082/payment/payment" method="POST">
            <input type="hidden" name="title" value="Minnios"></input>
            <input type="hidden" name="price" value="780"></input>
            <button type="submit" className={style.btn_finish}>
              Buy Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
