import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "../../scss/components/Cart/_cart.module.scss";
import { getCart, getShowtimeByMovieId } from "../../redux/actions/cart";
const tickets = [
  {
    title: "Thor: Love and Thunder",
    image:
      "https://image.tmdb.org/t/p/original/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
    price: "14",
  },
  {
    title: "Fight Club",
    image:
      "https://image.tmdb.org/t/p/original/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    price: "14",
  },
];
export default function Cart() {
  const dispatch = useDispatch();

  const movie = useSelector((state) => state.cartReducer.takenTickets);
  const cart = useSelector((state) => state.cartReducer.cart);
  const showtime = useSelector((state) => state.cartReducer.showtime);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <div className={style.container_cart}>
      <div className={style.title}>
        <h2>My Cart</h2>
        <button className={style.clearCart}>Clear cart</button>
      </div>

      <div className={style.cart}>
        {cart.length ? (
          cart.map((c) => {
            return (
              <div className={style.movies}>
                <img
                  src={"https://image.tmdb.org/t/p/original" + c.poster_path}
                />
                <h3>{c.movieId}</h3>
                <p>Movie Theater {c.room}</p>
                <p>
                  {c.format} • {c.tickets} tickets
                </p>
                <p>
                  {new Date(c.dateTime)
                    .toLocaleString()
                    .replace(",", " -")
                    .substring(0, 17)}
                  Hs
                </p>
                <p>Seats</p>
                <p>Amount</p>

                <div>
                  <button className={style.delete}>X</button>
                </div>
              </div>
            );
          })
        ) : (
          <p>You haven't ticktes in your cart yet!</p>
        )}
      </div>

      <div className={style.footerBtn}>
        <div className={style.addCombo}>
          <h3 style={{ color: "white" }}>Add combo</h3>
        </div>

        <div className={style.paymentGateway}>
          <form action="http://localhost:8082/payment/payment" method="POST">
            <input
              type="hidden"
              name="userId"
              value="633f41f593ae09e524360970"
            />
            {/* <input
              type="hidden"
              name="tickets"
              value={tickets.map((e) => {
                return `${e.title}%${e.price}%${e.image}`;
              })}
            /> */}
            <input
              type="hidden"
              name="title"
              value={tickets.map((e) => e.title)}
            />
            <input type="hidden" name="total" value="28" />
            <button type="submit" className={style.btn_finish}>
              Buy Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
