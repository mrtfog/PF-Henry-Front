import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../redux/actions'
import Card from './Card'
import style from '../scss/components/_cards.module.scss'


export default function Cards() {

    const dispatch = useDispatch()

    const movies = useSelector(state => state.movies)

    const [currentPage, setCurrentPage]= useState(1);
    const [moviesPerPage, setMoviesPerPage]= useState(20);
    const indexOfLastMovie = currentPage * moviesPerPage
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
    const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie)

    const paginado = function (pageNumber){
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
      setCurrentPage(1)
    }, [movies])

    useEffect(() => {

      dispatch(getMovies())
      
    }, [dispatch])


  return (
    <div className={style.container_cards}>
    <Paginado 
       moviesPerPage={moviesPerPage}
        movies={movies.length}
        setCurrentPage={paginado}
        currentPage={currentPage}/>
      {currentMovies.length > 0 ? currentMovies.map((data) => ( 
      <Card key={data._id} id={data._id} img={data.image} rating={data.rating} title={data.title} genres={data.genres} duration={data.duration}/>)) 
      : <h1>No hay pelis</h1>}
  </div>
  )
}
