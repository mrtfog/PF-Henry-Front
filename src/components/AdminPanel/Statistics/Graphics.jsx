import React, { useState } from "react";
import style from "../../../scss/components/AdminPanel/statistics/_graphics.module.scss";
import BarChart from "./BarChart";
import { UserData } from "./Data";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
const Graphics = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["rgb(255, 49, 90)", "rgb(73, 122, 166)"],
        borderColor: "rgba(236, 233, 233, 0.589)",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div className={style.container_statistics}>
      <div className={style.title}>
        <h1>Graphics</h1>
      </div>
      <div className={style.divGraphics}>
        <div style={{ width: 400 }}>
          <h3>Bar chart User</h3>
          <BarChart chartData={userData} />
        </div>
        <div style={{ width: 400 }}>
          <h3>Line chart User</h3>
          <LineChart chartData={userData} />
        </div>
        <div style={{ width: 300 }}>
          <h3>Pie chart User</h3>
          <PieChart chartData={userData} />
        </div>
      </div>
    </div>
  );
};

export default Graphics;
