import React from "react";
import style from "../../scss/components/Movies/_pagination.module.scss";

export default function Paginado({
  moviesPerPage,
  movies,
  setCurrentPage,
  currentPage,
}) {
  const pages = [];
  const numOfPages = Math.ceil(movies / moviesPerPage);

  for (let i = 1; i <= numOfPages; i++) {
    pages.push(i);
  }

  if (window.innerWidth < 576) {
    return (
        <div className={style.container_pagination}>
          <button
            className={`${style.button} ${style.prev_next}`}
            onClick={() =>
              setCurrentPage((curr) => (curr !== 1 ? curr - 1 : curr))
            }
          >
            &#10092; Prev
          </button>
          <button className={style.buttonCurr}> 
            {
                currentPage
            }
          </button>
          <button
            className={`${style.button} ${style.prev_next}`}
            onClick={() =>
              setCurrentPage((curr) => (curr !== pages.length ? curr + 1 : curr))
            }
          >
            {" "}
            Next &#10093;
          </button>
        </div>
      );
  } else {
    return (
      <div className={style.container_pagination}>
        <button
          className={`${style.button} ${style.prev_next}`}
          onClick={() =>
            setCurrentPage((curr) => (curr !== 1 ? curr - 1 : curr))
          }
        >
          &#10092; Prev
        </button>
        {pages &&
          pages.map((p, index) => {
            return (
              <button
                className={
                  currentPage === index + 1 ? style.buttonCurr : style.button
                }
                key={index}
                onClick={() => setCurrentPage(p)}
              >
                <p> {p} </p>
              </button>
            );
          })}
        <button
          className={`${style.button} ${style.prev_next}`}
          onClick={() =>
            setCurrentPage((curr) => (curr !== pages.length ? curr + 1 : curr))
          }
        >
          {" "}
          Next &#10093;
        </button>
      </div>
    );
  }
}
