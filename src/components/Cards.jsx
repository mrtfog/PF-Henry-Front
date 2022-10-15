import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../redux/actions/movies'
import Card from './Card'
import Loader from './Loader'
import style from '../scss/components/_cards.module.scss'

export default function Cards({page}) {

    const dispatch = useDispatch()
    const msg = useSelector(state => state.moviesReducer.msg)
    const movies = useSelector(state => state.moviesReducer.movies)

    useEffect(() => {

      if(movies.length === 0) dispatch(getMovies())
      
    }, [dispatch])
    

  return (
    <div className={style.container_cards}>
    
      {page.length > 0 ? page.map((data) => ( 
      <Card key={data._id} id={data._id} img={data.image} rating={data.rating} title={data.title} genres={data.genres} duration={data.duration}/>
      )
      ) 
      : (msg === "Loading..." ? <Loader /> : <p className={style.msg}>{msg}</p>)}
  </div>
  )
}
