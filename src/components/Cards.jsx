import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../redux/actions'
import Card from './Card'
import style from '../scss/components/_cards.module.scss'


export default function Cards() {

    const dispatch = useDispatch()

    useEffect(() => {

      dispatch(getMovies())

    }, [dispatch])

    const movies = useSelector(state => state.movies)

    console.log(movies)


  return (
    <div className={style.container_cards}>
        {movies.length > 0 ? movies.map((data) => ( 
        <Card key={data._id} id={data._id} img={data.image} rating={data.rating} title={data.title} genres={data.genres} duration={data.duration}/>)) 
        : <h1>No hay pelis</h1>}
    </div>
  )
}
