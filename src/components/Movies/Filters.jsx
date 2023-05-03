import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../../scss/components/Movies/_filters.module.scss'
import { sortByName, sortByRating, sortByGenre, getGenre } from '../../redux/actions/movies'

export default function Filters({setOrder, order, page, orderByRating, setOrderByRating, setOrderByGenre}) {

  const dispatch = useDispatch()


  let genresMovies = useSelector((state) => state.moviesReducer.genres)

  useEffect(() => {
    
    dispatch(getGenre())

  }, [])
  

  // ORDENAMIENTO ALFABÉTICO//
  const handleOrder = (e) => {
    setOrder(e.target.value)
    page(1)
    dispatch(sortByName(order))
  }

  // ORDENAMIENTO POR RANTING//
  const handleOrderByRating = (e) => {
    setOrderByRating(e.target.value)
    page(1)
    dispatch(sortByRating(orderByRating))
  }

    // ORDENAMIENTO POR GENERO//
  const handleOrderByGenre = (e) => {
    setOrderByGenre(e.target.value)
    page(1)
    dispatch(sortByGenre(e.target.value))
  }

  
  return (
      <div className={style.container_filters}>
          <select id='note' name='note' onChange={e => handleOrder(e)}>
              <option value="order">Order by name</option>
              <option value="ASC">From A to Z</option> 
              <option value="DESC">From Z to A</option> 
          </select> 

          <select  onChange={e => handleOrderByRating(e)}>
              <option value="order">Order by rating</option>
              <option value="ASC">Lowest to Highest</option> 
              <option value="DESC">Highest to Lowest</option> 
          </select>

          <select onChange={e => handleOrderByGenre(e)}>
              <option value="order">Filter by genre</option>
              { genresMovies?.map((g) => {
                return <option
                key={g.id}
                value={g.id}
                >{g.name}</option>
              })}
          </select>
      </div>
  )
}
