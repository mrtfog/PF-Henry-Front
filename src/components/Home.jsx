import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import style from '../scss/components/_home.module.scss'
import Cards from './Cards'
import Filters from './Filters'
import Paginado from './Paginado'
import { getGenre } from '../redux/actions'

export default function Home() {

  const dispatch = useDispatch()

    // Estado local de ordenamiento + función seteadora //
    const [order, setOrder] = useState('');

    // Estado local de ordenamiento de rating //
    const [orderByRating, setOrderByRating] = useState('')

    // Estado local de ordenamiento de rating //
    const [orderByGenre, setOrderByGenre] = useState()

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
    dispatch(getGenre())
  }, [movies])
  
  return (
    <div className={style.container_home}>
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
