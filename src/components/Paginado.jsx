import React from "react";
import style from '../scss/components/_paginado.module.scss'


export default function Paginado ({moviesPerPage, movies, setCurrentPage, currentPage}){
    const pages = [];
    const numOfPages = Math.ceil(movies / moviesPerPage)

    for (let i = 1; i <= numOfPages; i++) {
     pages.push(i)
     }

    return(
        <div >
        <button className={style.button} id={style.prev} onClick={() => setCurrentPage((curr) => curr!== 1? curr - 1 : curr)}>Prev</button>
        {   pages &&
            pages.map((p, index) => {
                return <button  className={currentPage===index+1?style.buttonCurr:style.button} key={index} onClick={() => setCurrentPage(p)}>{p}</button>
            })
        }
        <button  className={style.button} id={style.next} onClick={() => setCurrentPage((curr) =>curr!== pages.length ? curr + 1 : curr)}>Next</button>
    </div>
    )
}