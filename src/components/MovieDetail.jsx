import React, { useEffect } from 'react'
import style from '../scss/components/_movieDetail.module.scss'
import YouTube from 'react-youtube'
import { useSelector, useDispatch } from 'react-redux'
import { getMovieDetail, getMovieReviews } from '../redux/actions'
import { useParams } from 'react-router-dom'


export default function MovieDetail() {

    const {id}= useParams()
    const dispatch = useDispatch()

    useEffect(()=>{
        window.scrollTo(0, 0)
        dispatch(getMovieDetail(id))
        dispatch(getMovieReviews(id))
    }, [dispatch])


    const movie = useSelector(state => state.movieOnDisplay)
    const movieReviews = useSelector(state => state.movieReviews)
    
    const urlPoster = 'https://image.tmdb.org/t/p/original' + movie.poster_path
    const urlBanner = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path

    function getStars(num){
        let stars = ''

        while(num > 0){

            stars += '★'
            num--
        } 

        return stars
    }

    return (

        <div className={style.container_movieDetail}>

            <header>

                <div className={style.info}>

                    <h2>{movie.title}</h2>
                    <p>Release: {movie.release_date}  •  Duration: {movie.runtime} min   •   ★ {(Math.round(movie.vote_average * 100) / 100).toFixed(1)}</p>
                    <p>{movie.overview}</p>
                    <div className={style.buttons}>
                        <button>► Play</button>
                        <button className={style.secondary_button}>+ Add to List</button>
                    </div>
                </div>

                <div className={style.image} style={{backgroundImage: `url(${urlBanner})`}}></div>

                <div className={movie.backdrop_path ? style.gradient : `${style.gradient} ${style.gradient_color}`}>

                </div>

            </header>

            <div className={style.details}>

                <div className={style.section}>
                    <YouTube className={style.trailer} opts={{width: '850', height: '480'}}videoId={movie.videos ? (movie.videos.results.length > 0 ? movie.videos.results[0].key : '44A-KNz2U-w') : undefined}/>
                </div>

                <div className={style.section}>
                    <h3>Reviews</h3>
                    <hr />
                    <div className={style.review_container}>

                        {movieReviews.length > 0 ? movieReviews.map(r =>{

                            return(<div className={style.review}>
                                <p><span className={style.stars}>{getStars(r.stars)}</span><br/> {r.stars}/10</p>
                                <p className={style.text}>"{r.description}"</p>
                            </div>)
                        }) 
                        :
                        <div className={style.no_reviews}>
                        <p>The movie "{movie.title}" doesn't have reviews yet</p>
                        <button>Add Review</button>
                        </div>}

                    </div>

                </div>
            </div>
        
        </div>
    )
}



