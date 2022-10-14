import React,{ useEffect, useState } from 'react'
import Cards from '../Cards'
import Filters from '../Filters'
import Paginado from '../Paginado'
import { useSelector } from 'react-redux'
import SearchBar from '../SearchBar'
import style from '../../scss/components/Movies/_movies.module.scss'

export default function Movies() {
    

    
    const movies = useSelector(state => state.moviesReducer.movies)

    // Estado local de ordenamiento + función seteadora //
    const [order, setOrder] = useState('');

    // Estado local de ordenamiento de rating //
    const [orderByRating, setOrderByRating] = useState('')

    // Estado local de ordenamiento de rating //
    const [orderByGenre, setOrderByGenre] = useState()


    useEffect(() => {
      setCurrentPage(1)
    }, [])

    const [currentPage, setCurrentPage]= useState(1);
    const [moviesPerPage, setMoviesPerPage]= useState(20);

    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [currentPage])

  


    const indexOfLastMovie = currentPage * moviesPerPage
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
    const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie)


    const paginado = function (pageNumber){
        setCurrentPage(pageNumber)
    }
    
    
  return (
    <div className={style.container_movies}>

        <SearchBar />

        <Filters 
          setOrder={setOrder} 
          order={order} 
          page={paginado}
          orderByRating={orderByRating}
          setOrderByRating={setOrderByRating}
          orderByGenre={orderByGenre}
          setOrderByGenre={setOrderByGenre}
        />

        <Cards order={order} orderByGenre={orderByGenre} page={currentMovies}/>

        <Paginado 
          moviesPerPage={moviesPerPage}
          movies={movies.length}
          setCurrentPage={paginado}
          currentPage={currentPage}
        />

    </div>
  )
}
