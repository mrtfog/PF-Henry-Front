import React from "react";
// import style from "../../scss/components/AdminPanel/_users.module.scss";
//import CardsUser from "../CardsUser";
import CardsAdmin from '../CardsAdmin'
import style from "../../../scss/components/AdminPanel/_subscriptions.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllSubscribers, orderedBy } from "../../../redux/actions/subscribe";
import { useAuth } from '../../contexts/AuthContext'
import { useState } from "react";

const Subscriptions = () => {
  const avatar =
    "https://media.istockphoto.com/photos/beautiful-woman-posing-against-dark-background-picture-id638756792?k=20&m=638756792&s=612x612&w=0&h=PAiwpR6vmkBlctx0kmvGKX3HsBcMdd2PFD4BlEEI7Ac=";
  const fakeState = [
    {
      Name: "Ana Perez",
      rol: "admin",
      email: "ana@gmail.com",
      img: avatar,
      status: "active",
    },
    {
      Name: "Manuel Costa",
      rol: "cliente",
      email: "manu@gmail.com",
      img: avatar,
      status: "active",
    },
    {
      Name: "Jose Peña",
      rol: "cliente",
      email: "jose@gmail.com",
      img: avatar,
      status: "inactive",
    },
    {
      Name: "Matias Mogica",
      rol: "cliente",
      email: "mati@gmail.com",
      img: avatar,
      status: "active",
    },
    {
      Name: "Kate Ticse",
      rol: "cliente",
      email: "kate@gmail.com",
      img: avatar,
      status: "active",
    },
    {
      Name: "Luis Ruiz",
      rol: "admin",
      email: "luis@gmail.com",
      img: avatar,
      status: "inactive",
    },
  ];

  const {currentUser} = useAuth()
  const dispatch = useDispatch();
  const allSubscribers = useSelector((state)=> state.subscribeReducer.allSubscribers)

  useEffect(()=>{
    dispatch(getAllSubscribers(currentUser))
  }, [])

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
        <h2>All subscriptions record</h2>
      </div>

      <div className={style.infoContainer}>
        <div className={style.subInfoContainer}>
          <div className={style.subtitlesContainer}>
            <div className={style.subtitle1}>Status <button name="type" onClick={onClick}>
                {filters.type ? "⬆" : "⬇"}
              </button></div>
            <div className={style.subtitle2}>Last payment date<button name="date" onClick={onClick}>
                {filters.date ? "⬆" : "⬇"}
              </button></div>
            <div className={style.subtitle3}>Last payment amount<button name="amount" onClick={onClick}>
                {filters.amount ? "⬆" : "⬇"}
              </button></div>
            <div className={style.subtitle4}>User ID</div>
          </div>
          <div className={style.cardsContainer}>
            {allSubscribers &&
              allSubscribers.map((e, i) => {
                return (
                  <div key={i} className={style.card}>
                    <CardsAdmin
                        subscriptionStatus={e.deleted ? 'Active' : 'Cancelled'}
                        paymentDate={new Date(e.payments[e.payments.length-1].dateTime).toDateString()}
                        userId={e.userId}
                        amount={e.payments[e.payments.length-1].price}
                    ></CardsAdmin>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
