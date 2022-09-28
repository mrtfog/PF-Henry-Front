import React from 'react'
import {useDispatch} from 'react-redux';
import {useState} from 'react'
import {getMoviesByName} from '../redux/actions/index'

import style from '../scss/components/_searchbar.module.scss'

function SearchBar() {
    const dispatch = useDispatch();

    const [name, setName] = useState('')

    function handleSearchBar(e){
        e.preventDefault();
        setName(e.target.value)
        dispatch(getMoviesByName(name))
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getMoviesByName(name))
        setName("")
    }

  return (

    <div className={style.searchContainer}>
        <form onSubmit={e => handleSubmit(e)}>
        <input 
          className={style.inputSearch}
          type="text" 
          placeholder='Nombre de una película' 
          onChange={e => handleSearchBar(e)}/>
          <button type='submit'>Buscar</button>
    </form>
    </div>
    
  )
}

export default SearchBar