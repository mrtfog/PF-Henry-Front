import React, { useEffect } from 'react'
import style from '../scss/components/_movieDetail.module.scss'
// import YouTube from 'react-youtube'
import { useSelector, useDispatch } from 'react-redux'
import { getMovieDetail } from '../redux/actions'

export default function MovieDetail() {

    const dispatch = useDispatch()

    useEffect(()=>{

        dispatch(getMovieDetail())

    }, [dispatch])

    const movie = useSelector(state => state.movieOnDisplay)

    const url = 'https://image.tmdb.org/t/p/original' + movie.image

    return (

        <div className={style.container_movieDetail}>

            <header>

                <img src={url}  alt={movie.title} />
                <h2>{movie.title}</h2>
                <p>{movie.release_date}</p>
                <p>{movie.duration}</p>

            </header>

            <div>
                <div>
                    <p>{movie.summary}</p>
                </div>
            </div>
        
        </div>
    )
}


