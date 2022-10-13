import React, { useEffect } from 'react'
import style from '../scss/components/_movieDetail.module.scss'
import YouTube from 'react-youtube'
import { useSelector, useDispatch } from 'react-redux'
import { getMovieReviews } from '../redux/actions/reviews'
import { useHistory, useParams } from 'react-router-dom'
import { resetMovieDetail, getMovieDetail } from '../redux/actions/movies'
import { addToPlaylistDisplay, selectedMovie } from '../redux/actions/playlists'
import { useAuth } from './contexts/AuthContext'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'


export default function MovieDetail() {

    const {currentUser} = useAuth()

    const {id}= useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{

        window.scrollTo(0, 0)
        dispatch(getMovieDetail(id))
        dispatch(getMovieReviews(id))

        return ()=> dispatch(resetMovieDetail())

    }, [])


    const movie = useSelector(state => state.moviesReducer.movieDetail)
    const movieReviews = useSelector(state => state.reviewsReducer.movieReviews)
    const playlistDisplay = useSelector(state => state.playlistsReducer.formDisplay)

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

    function handleDisplay(){

        if(!currentUser){

            return Swal.fire({
              text:'To add a movie to your playlist you need to be logged in',
              icon: 'info',
              iconColor: '#497aa6',
              showCloseButton: true,
              showDenyButton: true,
              denyButtonText: 'Continue',
              confirmButtonText: 'Log In',
              allowEnterKey: false,
              customClass: {
                popup: 'Alert',
                closeButton: 'closeButton',
                confirmButton: 'confirmButton',
                denyButton: 'denyButton',
              }
            })
            .then((result)=>{
      
              if(result.isConfirmed){
                history.push(`/login`)
              }
            })
      
        }
        else{
            dispatch(addToPlaylistDisplay('flex'))
            dispatch(selectedMovie(movie.id, movie.title))
        }

    }

    return (

        <div className={style.container_movieDetail}>

            <header>

                <div className={style.info} style={{zIndex: playlistDisplay === 'none' ? 0 : -1}}>

                    <h2>{movie.title}</h2>
                    <p>Release: {movie.release_date}  •  Duration: {movie.runtime} min   •   ★ {(Math.round(movie.vote_average * 100) / 100).toFixed(1)}</p>
                    <p>{movie.overview}</p>
                    <div className={style.buttons}>
                        <button>► Play</button>
                        <button className={style.secondary_button} onClick={handleDisplay}>+ Add to List</button>
                    </div>
                </div>

                <div className={style.image} style={{backgroundImage: `url(${urlBanner})`}}></div>

                <div className={movie.backdrop_path ? style.gradient : `${style.gradient} ${style.gradient_color}`}>

                </div>

            </header>

            <div className={style.details}>

                <div className={style.section}>
                    {currentUser ?
                    <YouTube className={style.trailer} opts={{width: '850', height: '480'}}videoId={movie.videos ? (movie.videos.results.length > 0 ? movie.videos.results[0].key : '44A-KNz2U-w') : undefined}/>
                    :
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24" fill='#ffffff80'><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/></svg>
                        <p>To watch the movie you need to be logged in</p>
                    </>}

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



