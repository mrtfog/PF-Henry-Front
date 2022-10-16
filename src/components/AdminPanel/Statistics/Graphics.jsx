import React, { useState } from "react";
import BarChart from "./BarChart";
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
        backgroundColor: ["rgb(255, 49, 90)", "rgb(73, 122, 166)", "rgb(153, 89, 132)", "rgb(98, 85, 151)", "rgb(0, 186, 191)", "rgb(214, 244, 255)", "rgb(226, 158, 33)", "rgb(0, 82, 72)", "rgb(0, 76, 140)", "#73BC82", "rgb(115, 188, 130)", "rgb(150, 87, 39)"],
        borderColor: "rgba(236, 233, 233, 0.589)",
        borderWidth: 2,
      },
    ],
  };  


  useEffect(() => {
    if (!showtimes.length) dispatch(getAllShowtimes());
  }, []);

  const [graphicSelected, setGraphicSelected] = useState('BarChartUser')

  console.log('graphicSelected',graphicSelected)



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
                }
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
               }
                 Hr
            </span>

        </div>
      </div>
      <div className={style.divGraphics}>

        <div className={style.graphicsNav}>
          <h3 onClick={() => setGraphicSelected('BarChartUser')} className={graphicSelected === 'BarChartUser' ? `${style.selectedNavButton}` : ''}>Bar chart User</h3>
          <h3 onClick={() => setGraphicSelected('LineChartUser')} className={graphicSelected === 'LineChartUser' ? `${style.selectedNavButton}` : ''}>Line chart User</h3>
          <h3 onClick={() => setGraphicSelected('ShowtimesPerMovie')} className={graphicSelected === 'ShowtimesPerMovie' ? `${style.selectedNavButton}` : ''}>Showtimes per movies</h3>
        </div>

        <div className={style.graphics}>
               {graphicSelected === 'BarChartUser' ? 
                <div style={{ width: 600 }}>
                  <BarChart chartData={graphics} />
                </div> : 
                graphicSelected === 'LineChartUser' ?                 
                  <div style={{ width: 600 }}>
                    <LineChart chartData={graphics} />
                  </div> :
                  <div style={{ width: 350 }}>
                    <PieChart chartData={graphics} />
                  </div>
              }

        </div>

      </div>
    </div>
  );
};

export default Graphics;
