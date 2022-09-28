import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../redux/actions'
import Card from './Card'
import Paginado from './Paginado'
import style from '../scss/components/_cards.module.scss'

export default function Cards({page}) {

    const dispatch = useDispatch()
    // const movies = useSelector(state => state.movies)
    useEffect(() => {

      dispatch(getMovies())
      
    }, [dispatch])



  return (
    <div className={style.container_cards}>
    
      {page.length > 0 ? page.map((data) => ( 
      <Card key={data._id} id={data._id} img={data.image} rating={data.rating} title={data.title} genres={data.genres} duration={data.duration}/>
      )
      ) 
      : <h1>No hay pelis</h1>}
  </div>
  )
}
