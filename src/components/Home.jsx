import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import style from '../scss/components/_home.module.scss'
import Carousel from './Carousel'
import { getGenre } from '../redux/actions/movies'
import { getAllShowtimes, getBillboardMovies } from '../redux/actions/showtimes'
import Footer from './Footer'
import Slider from './Slider'

export default function Home() {

  const dispatch = useDispatch()


    const movies = useSelector(state => state.moviesReducer.movies)
    const showtimes = useSelector(state => state.showtimesReducer.showtimes)
    const billboardIds = Array.from(new Set(showtimes.map(s=>s.movieId)))



    useEffect(() => {
      dispatch(getGenre())
      dispatch(getAllShowtimes());
      dispatch(getBillboardMovies(billboardIds))
    }, [movies])

    const arrayBillboardMovies = useSelector(state => state.showtimesReducer.billboard)
    const arrayUpcomingMovies = useSelector(state => state.moviesReducer.upcoming)
    
    const horrorFilms = movies.filter((m) => {
      return m.genres.includes(27)
    }).slice(0, 20)

    const actionFilms = movies.filter((m) => {
      return m.genres.includes(28)
    }).slice(0, 20)

    const mostPopular = movies.sort( ( a, b ) => {
      if(a.rating < b.rating){
        return 1
      } else {
        return -1
      }
    }).slice(0, 10)
  

  return (
    <div className={style.container_home}>
        <Carousel></Carousel>
        <Slider title='Billboard' movies={arrayBillboardMovies}></Slider>
        <Slider title='Upcomings' movies={arrayUpcomingMovies}></Slider>
        <Slider title='Just for Halloween season 🎃' movies={horrorFilms}></Slider>
        <Slider title="Top 10 rated 💯" movies={mostPopular}></Slider>
        <Slider title="You're the  disease, and i'm the cure 💥" movies={actionFilms}></Slider>
        <Footer />
    </div>
  )
}
