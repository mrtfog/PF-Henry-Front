import React from "react";
import BarChart from "./BarChart";
// import { UserData } from "./Data";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllShowtimes } from "../../../redux/actions/showtimes";

import style from "../../../scss/components/AdminPanel/statistics/_graphics.module.scss";

const Graphics = () => {
  const dispatch = useDispatch();
  const showtimes = useSelector((state) => state.showtimesReducer.showtimes);

  const showtimesTitles = showtimes.map((m) => m.movieTitle);
  const activeMovieTheaters = new Set(showtimes.map((s) => s.roomId)).size;
  const showtimesAmount = showtimes.length;

  const showtimesDate = showtimes
    .map((s) => s.dateTime)
    .sort((a, b) => {
      if (a > b) return 1;
      return -1;
    });

  console.log(showtimesDate);

  const movieTheaters = useSelector((state) => state.roomReducer.rooms).length;

  const count = {};

  showtimesTitles.forEach((element) => {
    count[element] = (count[element] || 0) + 1;
  });

  const countByTitle = Object.keys(count);
  const countByAmount = Object.values(count);

  const graphics = {
    labels: countByTitle,
    datasets: [
      {
        label: "Showtimes amount",
        data: countByAmount,
        backgroundColor: ["rgb(255, 49, 90)", "rgb(73, 122, 166)"],
        borderColor: "rgba(236, 233, 233, 0.589)",
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    if (!showtimes.length) dispatch(getAllShowtimes());
  }, []);

  return (
    <div className={style.container_statistics}>
      <div className={style.title}>
        <h1>Graphics</h1>
      </div>
      <div className={style.cardsContainer}>
        <div className={style.card}>
          <h3>Movie theaters</h3>
          <p>
            Total: <span>{movieTheaters}</span>
          </p>
          <p>
            Actives: <span>{activeMovieTheaters}</span>
          </p>
        </div>

        <div className={style.card}>
          <h3>Showtimes</h3>
          <p>
            Total: <span> {showtimesAmount} </span>
          </p>
          <p>
            Movies on Billboard: <span>{countByTitle.length}</span>
          </p>
        </div>

        <div className={`${style.card} ${style.date}`}>
          <h3>Upcoming Showtime</h3>
          <p>
            Date:
            <br />
          </p>
            <span>
              {new Date(showtimesDate[0])
                .toLocaleString()
                .replace(",", " -")
                .substring(0, 50)}
              Hr
            </span>

        </div>

        <div className={`${style.card} ${style.date}`}>
          <h3>Last Show Scheduled</h3>
          <p>
            Date:
            <br />
          </p>
            <span>
              {new Date(showtimesDate[showtimesDate.length - 1])
                .toLocaleString()
                .replace(",", " -")
                .substring(0, 50)}
              Hr
            </span>

        </div>
      </div>
      <div></div>
      <div className={style.divGraphics}>
        <div style={{ width: 400 }}>
          <h3>Bar chart User</h3>
          <BarChart chartData={graphics} />
        </div>
        <div style={{ width: 400 }}>
          <h3>Line chart User</h3>
          <LineChart chartData={graphics} />
        </div>
        <div style={{ width: 300 }}>
          <h3>Pie chart User</h3>
          <PieChart chartData={graphics} />
        </div>
      </div>
    </div>
  );
};

export default Graphics;
