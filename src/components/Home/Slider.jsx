import React, { useRef } from "react";
import style from "../../scss/components/Home/_slider.module.scss";
import Card from '../common/Card';
import { useSelector } from "react-redux";
import Loader from "../common/Loader";

export default function Slider({ movies, title, scroll }) {
  const ref = useRef(null);
  const nav = ref.current;

  function handleOnClick(e) {
    e.target.innerHTML === "❭"
      ? (nav.scrollLeft += 800)
      : (nav.scrollLeft -= 800);
  }

  const msg = useSelector((state) => state.moviesReducer.msg);
  return (
    <div data-aos={scroll} className={style.titleContainer}>
      <h3>{title}</h3>
      <div className={style.holder}>
        <button
          onClick={(e) => handleOnClick(e)}
          className={style.slideButtons}
        >
          &#10092;
        </button>
        <div ref={ref} className={style.container_slider}>
          <div className={style.img_container}>
            {movies.length > 0 ? (
              movies.map((data) => (
                <Card
                  className={style.img}
                  key={data._id}
                  id={data._id}
                  img={data.image}
                  rating={data.rating}
                  title={data.title}
                  genres={data.genres}
                  duration={data.duration}
                />
              ))
            ) : msg === "Loading..." ? (
              <div className={style.loader}>
                <Loader />
              </div>
            ) : (
              <p className="msg">{msg}</p>
            )}
          </div>
        </div>
        <button
          onClick={(e) => handleOnClick(e)}
          className={style.slideButtons}
        >
          &#10093;
        </button>
      </div>
    </div>
  );
}
