import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from '../scss/components/_filters.module.scss'
import { sortByName, sortByRating } from '../redux/actions'

export default function Filters({setOrder, order, page, orderByRating, setOrderByRating}) {

  const dispatch = useDispatch()



  // ORDENAMIENTO ALFABÉTICO//
  const handleOrder = (e) => {
    setOrder(e.target.value)
    page(1)
    dispatch(sortByName(order))
  }

  const handleOrderByRating = (e) => {
    setOrderByRating(e.target.value)
    console.log(e.target.value)
    page(1)
    dispatch(sortByRating(orderByRating))
  }
  
  return (
    <div className={style.container_filters}>
        <select onChange={e => handleOrder(e)}>
            <option value="order">Order by name</option>
            <option value="ASC">From A to Z</option> 
            <option value="DESC">From Z to A</option> 
        </select>


        <select onChange={e => handleOrderByRating(e)}>
            <option value="order">Order by rating</option>
            <option value="ASC">rating asc</option> 
            <option value="DESC">rating desc</option> 
        </select>

    </div>
  )
}
