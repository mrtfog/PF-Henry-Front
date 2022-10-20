import React, { useState } from "react";
import CardsAdmin from "../CardsAdmin";
import style from "../../../scss/components/AdminPanel/statistics/_sales.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { getAllReservations, orderedBy } from "../../../redux/actions/cart";

function Payments() {

  // const screenWidth = document.body.clientWidth

  const [screenWidth, setScreenWidth] = useState(document.body.clientWidth)

  window.addEventListener('resize', ()=>{

    setScreenWidth(document.body.clientWidth)
})


  const dispatch = useDispatch();
  const allReservations = useSelector(
    (state) => state.cartReducer.allReservations
  ).filter((r) => r.payed === true);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!allReservations.length) dispatch(getAllReservations(currentUser));
  }, []);

  const [filters, setFilters] = useState({
    type: false,
    amount: false,
    date: false,
  });

  const onClick = (e) => {
    if(filters[e.target.name] === false){
      setFilters({
        ...filters,
        [e.target.name]: true
      })
      dispatch(orderedBy(e.target.name, filters[e.target.name]))
    }

    else{
      setFilters({
        ...filters,
        [e.target.name]: false
      })
      dispatch(orderedBy(e.target.name, filters[e.target.name]))
    }

    
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.titleContainer}>
        <h2>Total sales record</h2>
      </div>

      <div className={style.infoContainer}>
        <div className={style.subInfoContainer}>
          <div className={style.subtitlesContainer}>
            <div className={style.subtitle1}>
              Type{" "}
              <button name="type" onClick={onClick}>
                {filters.type ? "⬆" : "⬇"}
              </button>
            </div>
            <div className={style.subtitle2}>
              Payment date{" "}
              <button name="date" onClick={onClick}>
                {filters.date? "⬆" : "⬇"}
              </button>
            </div>
            <div className={style.subtitle3}>
              Amount{" "}
              <button name="amount" onClick={onClick}>
                {filters.amount ? "⬆" : "⬇"}
              </button>
            </div>
            <div className={style.subtitle4} style={screenWidth > 570 ? { display: 'flex' } : { display: 'none' }}>User email</div>
          </div>
          <div className={style.cardsContainer}>
            <div className={style.allCardsContainer}>
              {allReservations &&
                allReservations.map((e) => {
                  return (
                    <CardsAdmin
                      className={style.cards}
                      saleType={
                        e.type == "standard" ? "ticket" : "subscription"
                      }
                      paymentDate={e.payedAt ? e.payedAt.slice(0,10) : ""}
                      amount={e.price}
                      userId={e.email}
                    ></CardsAdmin>
                  );
                })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Payments;
