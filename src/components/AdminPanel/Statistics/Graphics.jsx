import React from "react";
import style from "../../../scss/components/AdminPanel/statistics/_graphics.module.scss";

const Graphics = () => {
  return (
    <div className={style.container_statistics}>
      <div className={style.title}>
        <h2>Statistics {">"} </h2>
        <h3>Graphics</h3>
      </div>
    </div>
  );
};

export default Graphics;
