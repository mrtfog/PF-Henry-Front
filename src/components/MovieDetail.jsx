/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import style from '../scss/components/_movieDetail.module.scss'
import YouTube, { YouTubeProps } from 'react-youtube'
import { useSelector, useDispatch } from 'react-redux'
import { getMovieDetail } from '../redux/actions'
import { useParams } from 'react-router-dom'


export default function MovieDetail() {

    const {id}= useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getMovieDetail(id))
    }, [dispatch])

    const movie = useSelector(state => state.movieOnDisplay)
    console.log(movie)
    
    const urlPoster = 'https://image.tmdb.org/t/p/original' + movie.poster_path
    const urlBanner = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path

    return (

        <div className={style.container_movieDetail}>

            <header>

                <div>

                    <h2>{movie.title}</h2>
                    <p>Release: {movie.release_date}  •  Duration: {movie.runtime} min   •   ★ {movie.vote_average}</p>

                    <div className={style.buttons}>
                        <button className={style.buttons}>► Reproducir</button>
                        <button>+ Add to List</button>
                    </div>
                </div>

                <img src={urlBanner}  alt={movie.title} />

                <div className={style.gradient}>

                </div>

            </header>

            <div className={style.details}>

                <div className={style.section}>
                    <h3>Summary</h3>
                    <hr />
                    <p>{movie.overview}</p>
                </div>

                <div className={style.section}>
                    <YouTube className={style.trailer} videoId={movie.videos ? (movie.videos.results.length > 0 ? movie.videos.results[0].key : '44A-KNz2U-w') : undefined}/>
                </div>

                <div className={style.section}>
                    <h3>Reviews</h3>
                    <hr />
                </div>
            </div>
        
        </div>
    )
}


