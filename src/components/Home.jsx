import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import style from '../scss/components/_home.module.scss'
import Cards from './Cards'
import Filters from './Filters'
import Paginado from './Paginado'

export default function Home() {

    // Estado local de ordenamiento + función seteadora //
    const [order, setOrder] = useState('');


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

  
  return (
    <div className={style.container_home}>
        <Filters setOrder={setOrder} order={order}/>
        <Cards order={order} page={currentMovies}/>
        <Paginado 
         moviesPerPage={moviesPerPage}
          movies={movies.length}
          setCurrentPage={paginado}
          currentPage={currentPage}
          />
    </div>
  )
}
