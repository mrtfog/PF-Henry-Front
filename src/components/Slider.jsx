import React, { useRef, useEffect} from "react";
import img from '../assets/uncharted-poster.jpg';
import style from '../scss/components/_slider.module.scss'
import Card from "./Card";
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../redux/actions/movies';
import Loader from './Loader'

export default function Slider() {
    const dispatch = useDispatch()
    const ref = useRef(null)
    useEffect(() => {

        dispatch(getMovies())
        
      }, [dispatch])
      
      const nav = ref.current
      
function handleOnClick(e){

    e.target.innerHTML === 'Next' ? nav.scrollLeft += 240 : nav.scrollLeft -= 240;
  
}



const allMovies = useSelector(state=>state.moviesReducer.movies)
let movies = allMovies?.slice(0, 20)
const msg = useSelector(state => state.moviesReducer.msg)
  return (
      <div className={style.holder}>
      <button onClick={(e)=>handleOnClick(e)}  className={style.slideButtons}>Back</button>
            <div ref={ref} className={style.container}>
                <div className={style.img_container}>
        
            
            {movies.length > 0 ? movies.map((data) => ( 
                <Card className={style.img} key={data._id} id={data._id} img={data.image} rating={data.rating} title={data.title} genres={data.genres} duration={data.duration}/>
                )
                ) 
                : (msg === "Loading..." ? <Loader /> : <p className='msg'>{msg}</p>)}
                </div>
            </div>
        <button onClick={(e)=>handleOnClick(e)}  className={style.slideButtons}>Next</button>
    </div>
  )
}