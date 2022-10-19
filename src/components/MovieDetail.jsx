import React, { useEffect, useState } from 'react'
import style from '../scss/components/_movieDetail.module.scss'
import YouTube from 'react-youtube'
import { useSelector, useDispatch } from 'react-redux'
import { getMovieReviews, setFormDisplay } from '../redux/actions/reviews'
import { useHistory, useParams } from 'react-router-dom'
import { resetMovieDetail, getMovieDetail } from '../redux/actions/movies'
import { addToPlaylistDisplay, selectedMovie } from '../redux/actions/playlists'
import { useAuth } from './contexts/AuthContext'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import ReviewTemplate from './ReviewTemplate'
import { getAllShowtimes } from '../redux/actions/showtimes'
import axios from 'axios'
import { addToCartDisplay, takenTickets } from '../redux/actions/cart'


export default function MovieDetail() {

    const {currentUser} = useAuth()

    const {id}= useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const screenWidth = document.body.clientWidth
    
    const [subscriptionBoolean, setsubscriptionBoolean] = useState(0)

    if (currentUser) {
      axios.get("https://pf-henry-back.herokuapp.com/subscription/hasActiveSubscription", { headers: { "user": currentUser.accessToken } }).then(r => { setsubscriptionBoolean(r.data) })
    }

    useEffect(()=>{

        window.scrollTo(0, 0)
        dispatch(getMovieDetail(id))
        dispatch(getMovieReviews(id))
        if(!showtimes.length) dispatch(getAllShowtimes())

        return ()=> dispatch(resetMovieDetail())

    }, [])

    const [autoplay, setAutoplay] = useState(0)

    function handleMovieAlert(){
      
      if(!subscriptionBoolean){

        return Swal.fire({
          text:'To watch a movie you need to be subscribed',
          icon: 'info',
          iconColor: '#497aa6',
          showCloseButton: true,
          showDenyButton: true,
          denyButtonText: 'Continue',
          confirmButtonText: 'Subscribe',
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
            history.push(`/subscribe`)
          }
        })
        
      }

    }

    
    function handleAddReview(){
      
      if(!currentUser){

        return Swal.fire({
          text:'To add a review you need to be logged in',
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

        dispatch(setFormDisplay('flex'))
      }
    }


    console.log(document.querySelector('.videoo'))
    const movie = useSelector(state => state.moviesReducer.movieDetail)
    const movieReviews = useSelector(state => state.reviewsReducer.movieReviews)
    const playlistDisplay = useSelector(state => state.playlistsReducer.formDisplay)
    const showtimes = useSelector(state => state.showtimesReducer.showtimes)
    const billboard = Array.from(new Set(showtimes.map(s=>s.movieId)))

    const urlBanner = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path


    function handleAddToCart(){

      dispatch(addToCartDisplay('flex'))
      dispatch(takenTickets(movie.id, movie.title))
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
                    {screenWidth > 570 ?                     
                    <p>Release: {movie.release_date}  •  Duration: {movie.runtime} min   •   ★ {(Math.round(movie.vote_average * 100) / 100).toFixed(1)}</p>
                    : <div>
                        <p>Release: {movie.release_date}</p>
                        <p>Duration: {movie.runtime} min  </p>
                        <p>★ {(Math.round(movie.vote_average * 100) / 100).toFixed(1)}</p>
                    </div>}
                    { screenWidth > 570 ? <p>{movie.overview}</p> : null}
                    <div className={style.buttons}>
                        {!billboard.includes(movie.id) ?
                        <a href='#video'><button onClick={!subscriptionBoolean ? (e)=> handleMovieAlert(e) : null}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/></svg>Play</button></a>
                        : 
                        <button onClick={handleAddToCart}><svg className={style.icon} version="1.1" id="icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 130 120" enableBackground="new 0 0 128 128" xmlSpace="preserve">
                      <path d="M82.859,17.211l-11.996-3.084c-0.81-0.207-1.672-0.069-2.376,0.387c-0.703,0.455-1.185,1.183-1.327,2.008
                        c-0.029,0.17-0.043,0.276-0.055,0.361c-0.909,3.537-4.091,6.008-7.738,6.008c-0.668,0-1.341-0.085-1.997-0.254
                        c-2.068-0.531-3.807-1.837-4.893-3.676c-1.087-1.839-1.392-3.991-0.864-6.054c0.033-0.085,0.072-0.186,0.129-0.35
                        c0.272-0.792,0.201-1.661-0.195-2.398c-0.397-0.737-1.084-1.274-1.895-1.483L38.069,5.698c-0.771-0.197-1.589-0.083-2.273,0.323
                        c-0.685,0.405-1.181,1.065-1.379,1.836L13.486,89.293c-0.413,1.604,0.554,3.24,2.158,3.652l24.07,6.187
                        c-0.233-0.188-0.463-0.389-0.689-0.606c-1.132-1.087-1.328-2.903-0.547-4.241c0.29-0.497,0.651-0.932,0.948-1.422l-19.382-4.982
                        l19.438-75.625l5.924,1.523c-0.233,2.859,0.417,5.714,1.906,8.234c1.902,3.219,4.944,5.504,8.565,6.435
                        c1.144,0.294,2.319,0.443,3.492,0.443c5.57,0,10.521-3.291,12.752-8.245l6.34,1.63l-3.778,14.7c1.44-0.858,3.659-0.253,4.781,1.28
                        c0.351-0.001,0.701,0.065,1.039,0.179l4.516-17.57C85.431,19.258,84.464,17.623,82.859,17.211z"/>
                      <path d="M33.675,34.843c-0.164,0-0.332-0.021-0.499-0.063l-2.421-0.622c-1.069-0.275-1.714-1.365-1.44-2.434
                        c0.275-1.069,1.363-1.715,2.436-1.44l2.421,0.622c1.069,0.275,1.714,1.365,1.439,2.435C35.379,34.243,34.566,34.843,33.675,34.843z
                        "/>
                      <path d="M68.815,43.875c-0.164,0-0.332-0.021-0.499-0.063l-4.393-1.129c-1.069-0.275-1.714-1.365-1.439-2.435
                        c0.275-1.068,1.363-1.716,2.436-1.439l4.393,1.129c1.069,0.275,1.714,1.365,1.44,2.435C70.519,43.275,69.707,43.875,68.815,43.875z
                        M60.03,41.617c-0.164,0-0.332-0.021-0.499-0.063l-4.393-1.129c-1.069-0.275-1.714-1.365-1.439-2.435
                        c0.275-1.068,1.36-1.713,2.436-1.439l4.392,1.129c1.069,0.275,1.714,1.365,1.439,2.435C61.734,41.017,60.922,41.617,60.03,41.617z
                        M51.245,39.359c-0.164,0-0.332-0.02-0.499-0.063l-4.393-1.129c-1.069-0.275-1.714-1.365-1.439-2.435
                        c0.275-1.068,1.361-1.714,2.436-1.439l4.393,1.129c1.069,0.275,1.714,1.365,1.439,2.435C52.949,38.759,52.137,39.359,51.245,39.359
                        z M42.46,37.101c-0.164,0-0.332-0.021-0.499-0.063l-4.393-1.129c-1.069-0.275-1.714-1.365-1.439-2.435
                        c0.275-1.068,1.361-1.716,2.436-1.439l4.393,1.129c1.069,0.275,1.714,1.365,1.439,2.435C44.164,36.501,43.352,37.101,42.46,37.101z
                        "/>
                      <path d="M29.017,83.456c-0.164,0-0.332-0.021-0.499-0.063c-1.069-0.275-1.714-1.365-1.44-2.436l5.312-20.664
                        c0.275-1.068,1.362-1.708,2.436-1.439c1.069,0.275,1.714,1.365,1.439,2.436l-5.312,20.664
                        C30.721,82.856,29.908,83.456,29.017,83.456z"/>
                      <path d="M42.204,65.924c-0.164,0-0.332-0.021-0.499-0.063c-1.069-0.275-1.714-1.365-1.439-2.435l4.45-17.313
                        c0.275-1.069,1.361-1.715,2.436-1.439c1.069,0.275,1.714,1.365,1.439,2.435l-4.45,17.313
                        C43.908,65.324,43.096,65.924,42.204,65.924z"/>
                      <path d="M35.72,57.337c-0.165,0-0.333-0.021-0.501-0.063c-1.069-0.276-1.713-1.366-1.437-2.437l2.795-10.831
                        c0.275-1.069,1.363-1.715,2.437-1.437c1.069,0.276,1.713,1.367,1.437,2.436l-2.795,10.833C37.423,56.738,36.61,57.337,35.72,57.337
                        z"/>
                      <path d="M51.182,61.396c-0.164,0-0.332-0.021-0.499-0.063c-1.069-0.275-1.714-1.365-1.439-2.436l2.806-10.914
                        c0.275-1.068,1.361-1.71,2.436-1.439c1.069,0.275,1.714,1.365,1.439,2.436l-2.806,10.914
                        C52.886,60.796,52.073,61.396,51.182,61.396z"/>
                      <path d="M59.983,120.739c-0.032,0-0.065-0.001-0.098-0.002c-0.796-0.025-1.548-0.366-2.092-0.947L26.176,86.039
                        c-0.544-0.58-0.835-1.354-0.809-2.148c0.025-0.796,0.366-1.548,0.947-2.092l61.363-57.484c0.58-0.544,1.351-0.835,2.148-0.809
                        c0.796,0.026,1.548,0.367,2.092,0.948l8.175,8.727c0.572,0.611,0.863,1.434,0.803,2.269c-0.061,0.835-0.469,1.607-1.123,2.129
                        c-0.133,0.105-0.218,0.168-0.29,0.221c-3.217,3.016-3.382,8.086-0.368,11.304c1.528,1.631,3.601,2.528,5.837,2.528
                        c2.037,0,3.979-0.768,5.466-2.161c0.055-0.063,0.124-0.146,0.239-0.273c0.563-0.62,1.36-0.976,2.198-0.982c0.007,0,0.015,0,0.023,0
                        c0.829,0,1.622,0.344,2.189,0.949l8.469,9.04c1.133,1.209,1.07,3.108-0.139,4.24l-61.362,57.485
                        C61.477,120.45,60.744,120.739,59.983,120.739z M32.605,84.127l27.517,29.372l56.983-53.384l-4.476-4.776
                        c-2.264,1.489-4.92,2.292-7.678,2.292c-3.856,0-7.58-1.613-10.217-4.427c-4.717-5.035-4.985-12.664-0.963-17.995l-4.183-4.465
                        L32.605,84.127z"/>
                      <path d="M73.642,46.998c-0.533,0-1.065-0.212-1.46-0.633l-1.709-1.824c-0.755-0.806-0.714-2.072,0.093-2.827
                        c0.807-0.753,2.071-0.713,2.827,0.092l1.709,1.824c0.755,0.806,0.714,2.072-0.093,2.827C74.623,46.819,74.132,46.998,73.642,46.998
                        z"/>
                      <path d="M98.447,73.477c-0.533,0-1.065-0.212-1.46-0.633l-3.101-3.31c-0.755-0.806-0.714-2.071,0.093-2.827
                        c0.806-0.754,2.07-0.715,2.827,0.093l3.101,3.31c0.755,0.806,0.714,2.071-0.093,2.827C99.429,73.298,98.937,73.477,98.447,73.477z
                        M92.246,66.856c-0.533,0-1.065-0.212-1.46-0.633l-3.101-3.31c-0.755-0.806-0.714-2.071,0.093-2.827
                        c0.807-0.754,2.071-0.715,2.827,0.093l3.101,3.31c0.755,0.806,0.714,2.071-0.093,2.827C93.227,66.678,92.736,66.856,92.246,66.856z
                        M86.044,60.237c-0.533,0-1.065-0.212-1.46-0.633l-3.101-3.31c-0.755-0.806-0.714-2.071,0.093-2.827
                        c0.806-0.754,2.07-0.714,2.827,0.093l3.101,3.309c0.755,0.806,0.714,2.071-0.093,2.827C87.025,60.059,86.534,60.237,86.044,60.237z
                        M79.843,53.617c-0.533,0-1.065-0.212-1.46-0.633l-3.101-3.31c-0.755-0.806-0.714-2.071,0.093-2.827
                        c0.806-0.754,2.071-0.715,2.827,0.093l3.101,3.31c0.755,0.806,0.714,2.071-0.093,2.827C80.824,53.438,80.333,53.617,79.843,53.617z
                        "/>
                      <path d="M103.258,78.611c-0.533,0-1.065-0.212-1.46-0.633l-1.709-1.824c-0.755-0.806-0.714-2.071,0.093-2.827
                        c0.806-0.754,2.07-0.714,2.827,0.093l1.709,1.824c0.755,0.806,0.714,2.071-0.093,2.827
                        C104.239,78.433,103.748,78.611,103.258,78.611z"/>
                      <path d="M43.624,85.521c-0.533,0-1.065-0.212-1.46-0.633c-0.755-0.806-0.714-2.071,0.093-2.827l15.571-14.586
                        c0.806-0.754,2.07-0.715,2.827,0.093c0.755,0.806,0.714,2.071-0.093,2.827L44.991,84.98C44.605,85.342,44.114,85.521,43.624,85.521
                        z"/>
                      <path d="M49.373,91.655c-0.533,0-1.066-0.212-1.46-0.633c-0.755-0.806-0.714-2.072,0.093-2.827l8-7.493
                        c0.807-0.754,2.071-0.715,2.827,0.093c0.755,0.806,0.714,2.072-0.093,2.827l-8,7.493C50.354,91.477,49.863,91.655,49.373,91.655z"
                        />
                      <path d="M64.16,77.803c-0.533,0-1.066-0.213-1.46-0.633c-0.755-0.806-0.714-2.071,0.093-2.827L75.84,62.122
                        c0.806-0.754,2.073-0.713,2.827,0.093c0.755,0.806,0.714,2.071-0.093,2.827L65.527,77.263C65.142,77.624,64.65,77.803,64.16,77.803
                        z"/>
                      <path d="M63.297,67.077c-0.534,0-1.067-0.213-1.461-0.634c-0.754-0.807-0.712-2.072,0.095-2.827l8.171-7.642
                        c0.805-0.754,2.071-0.714,2.827,0.095c0.754,0.807,0.712,2.072-0.095,2.827l-8.171,7.642
                        C64.277,66.898,63.787,67.077,63.297,67.077z"/>
                      <path d="M54.548,97.179c-0.533,0-1.065-0.212-1.46-0.633c-0.755-0.806-0.714-2.071,0.093-2.827L68.75,79.133
                        c0.807-0.754,2.07-0.715,2.827,0.093c0.755,0.806,0.714,2.071-0.093,2.827L55.915,96.639C55.529,97,55.038,97.179,54.548,97.179z"
                        />
                      <path d="M60.87,103.929c-0.533,0-1.066-0.212-1.46-0.633c-0.755-0.806-0.714-2.072,0.093-2.827l8.001-7.494
                        c0.806-0.754,2.07-0.715,2.827,0.093c0.755,0.806,0.714,2.072-0.093,2.827l-8.001,7.494C61.852,103.75,61.36,103.929,60.87,103.929
                        z"/>
                      <path d="M75.656,90.075c-0.533,0-1.066-0.212-1.46-0.633c-0.755-0.807-0.714-2.072,0.093-2.827l13.048-12.221
                        c0.807-0.754,2.071-0.715,2.827,0.093c0.755,0.807,0.714,2.072-0.093,2.827L77.023,89.535
                        C76.638,89.896,76.146,90.075,75.656,90.075z"/>
                      <path d="M74.167,78.8c-0.533,0-1.065-0.212-1.459-0.633c-0.756-0.806-0.715-2.071,0.092-2.826l8.223-7.705
                        c0.806-0.756,2.071-0.715,2.826,0.092c0.756,0.806,0.715,2.071-0.092,2.826l-8.223,7.705C75.148,78.621,74.657,78.8,74.167,78.8z"
                        />
                      </svg>Book Tickets</button>
                        }
                        
                        <button className={style.secondary_button} onClick={handleDisplay}><svg className={style.icon} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="3px"
                        width="20" height="20" viewBox="0 0 505 440" enableBackground="new 0 0 512 512" xmlSpace="preserve">
                        <path d="M488.5,256c0,9.1-6.83,16.5-15.23,16.5H272.5v200.77c0,8.4-7.4,15.23-16.5,15.23c-9.1,0-16.5-6.83-16.5-15.23V272.5
                        H38.73c-8.4,0-15.23-7.4-15.23-16.5c0-9.1,6.83-16.5,15.23-16.5H239.5V38.73c0-8.4,7.4-15.23,16.5-15.23
                        c9.1,0,16.5,6.83,16.5,15.23V239.5h200.77C481.67,239.5,488.5,246.9,488.5,256z"/>
                        </svg> Add to List</button>
                    </div>
                </div>

                <div className={style.image} style={{backgroundImage: `url(${urlBanner})`}}></div>

                <div className={movie.backdrop_path ? style.gradient : `${style.gradient} ${style.gradient_color}`}>

                </div>

            </header>

            <div className={style.details}>

                {screenWidth <= 570 ?
                  
                <div className={style.section}>
                    <h3>Summary</h3>
                    <hr />
                    <p>{movie.overview}</p>
                </div>

                : null}

                <div className={style.section} id='video'>
                    {subscriptionBoolean ?
                    <YouTube iframeClassName='videoo' className={style.trailer} opts={screenWidth > 576 ? {width: '850', height: '480'} : {width: '320', height: '200'}} videoId={movie.videos ? (movie.videos.results.length > 0 ? movie.videos.results[0].key : '44A-KNz2U-w') : undefined}/>
                    :
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24" fill='#ffffff80'><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/></svg>
                        <p>To watch the movie you need to be subscribed</p>
                    </>}

                </div>

                <div className={style.section}>
                    <div className={style.titleAndButton}>
                        <h3>Reviews</h3>
                        {movieReviews.length ? <button className={style.sideButton} onClick={()=> dispatch(setFormDisplay('flex'))}>
                            {screenWidth > 570 ? 
                            'Add Review' 
                            : <svg className={style.icon} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="3px"
                            width="20" height="20" viewBox="0 0 505 440" enableBackground="new 0 0 512 512" xmlSpace="preserve">
                            <path d="M488.5,256c0,9.1-6.83,16.5-15.23,16.5H272.5v200.77c0,8.4-7.4,15.23-16.5,15.23c-9.1,0-16.5-6.83-16.5-15.23V272.5
                            H38.73c-8.4,0-15.23-7.4-15.23-16.5c0-9.1,6.83-16.5,15.23-16.5H239.5V38.73c0-8.4,7.4-15.23,16.5-15.23
                            c9.1,0,16.5,6.83,16.5,15.23V239.5h200.77C481.67,239.5,488.5,246.9,488.5,256z"/>
                            </svg>}
                        </button> : null}
                    </div>
                    <hr />
                    <div className={style.review_container}>

                        {movieReviews.length > 0 ? movieReviews.map(r => <ReviewTemplate stars={r.stars} description={r.description} username={r.username} key={r._id} />) 
                        :
                        <div className={style.no_reviews}>
                        <p>The movie '{movie.title}' does not have reviews yet</p>
                        <button onClick={handleAddReview}>Add Review</button>
                        </div>}

                    </div>

                </div>
            </div>
        
        </div>
    )
}



