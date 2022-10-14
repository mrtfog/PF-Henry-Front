import React, { useRef, useEffect} from "react";
import style from '../scss/components/_slider.module.scss'
import Card from "./Card";
import { useDispatch, useSelector } from 'react-redux';
import { getUpcoming } from '../redux/actions/movies';
import Loader from './Loader'

export default function Slider({ movies, title }) {
    const dispatch = useDispatch()
    const ref = useRef(null)
    const nav = ref.current

    useEffect(() => {        
        dispatch(getUpcoming())
      }, [])
      
      
function handleOnClick(e){


    e.target.innerHTML === '❭' ? nav.scrollLeft += 800 : nav.scrollLeft -= 800;
  
}



// const allMovies = useSelector(state=>state.moviesReducer.movies)
// let movies = allMovies?.slice(0, 20)
const msg = useSelector(state => state.moviesReducer.msg)
  return (
      <div className={style.titleContainer}>
      <h3>{title}</h3>
      <div className={style.holder}>
      <button onClick={(e)=>handleOnClick(e)} className={style.slideButtons}>&#10092;</button>
            <div ref={ref} className={style.container_slider}>
                <div className={style.img_container}>
        
            
            {movies.length > 0 ? movies.map((data) => ( 

                <Card className={style.img} key={data._id} id={data._id} img={data.image} rating={data.rating} title={data.title} genres={data.genres} duration={data.duration} />

                )
                ) 
                : (msg === "Loading..." ? <div className={style.loader}><Loader /></div>  : <p className='msg'>{msg}</p>)}
                </div>
            </div>
        <button onClick={(e)=>handleOnClick(e)}  className={style.slideButtons}>&#10093;</button>
    </div>
    </div>
  )

}
