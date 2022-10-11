import React from "react";
// import style from "../../scss/components/AdminPanel/_users.module.scss";
import CardsUser from "./CardsUser";

import style from "../../scss/components/AdminPanel/_users.module.scss";
const Users = () => {
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

  return (
    <div className={style.mainContainer}>
      <div className={style.titleContainer}>
        <h2>Users</h2>
      </div>

      <div className={style.infoContainer}>
        <div className={style.subInfoContainer}>
          <div className={style.fieldsContainer}>
            <div className={style.field}>
              <label>Filter by rol</label>
              <select>
                <option value="Subscription">Subscription</option>
                <option value="Ticket">Ticket</option>
              </select>
            </div>

            <div className={style.field}>
              <label>Order by date</label>
              <select>
                <option value="Most recent">Most recent</option>
                <option value="Last 7 days">Las 7 days</option>
                <option value="Last 15 days">Last 15 days</option>
                <option value="Last month">Last month</option>
                <option value="All">All</option>
              </select>
            </div>

            <div className={style.field}>
              <label>Order amount</label>
              <select>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </select>
            </div>
          </div>
        </div>

        <div className={style.subInfoContainer}>
          <div className={style.subtitlesContainer}>
            <div className={style.subtitle1}>Rol</div>
            <div className={style.subtitle2}>Name</div>
            <div className={style.subtitle3}>Email</div>
          </div>
          <div className={style.cardsContainer}>
            {fakeState &&
              fakeState.map((e, i) => {
                return (
                  <div key={i} className={style.card}>
                    <CardsUser
                      img={e.img}
                      Name={e.Name}
                      email={e.email}
                      rol={e.rol}
                      status={e.status}
                    ></CardsUser>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
