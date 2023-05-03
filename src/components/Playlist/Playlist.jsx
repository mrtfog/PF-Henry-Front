import React,{ useState, useEffect } from 'react'
import style from '../../scss/components/Playlist/_playlist.module.scss'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearSelectedPlaylist, getPlaylist, getPlaylistMovies, removeMovieFromPlaylist } from '../../redux/actions/playlists'
import PopUpTemplate from '../common/PopUpTemplate'
import { useAuth } from '../../contexts/AuthContext'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'


export default function Playlist() {

    const { currentUser } = useAuth()
    const dispatch = useDispatch()

    const [screenWidth, setScreenWidth] = useState(document.body.clientWidth)

    window.addEventListener('resize', ()=>{

        setScreenWidth(document.body.clientWidth)
    })

    const { id } = useParams()

    const playlist = useSelector(state => state.playlistsReducer.selectedPlaylist)
    const movies = useSelector(state => state.playlistsReducer.movies)

    useEffect(() => {
        dispatch(getPlaylist(id, currentUser))
        return () => dispatch(clearSelectedPlaylist())

    }, [id])

    if (!movies.length && playlist.moviesId) {
        dispatch(getPlaylistMovies(playlist.moviesId))
    }

    const [randomMovie, setRandomMovie] = useState(false)
    const [display, setDisplay] = useState('none')


    function handleMovieDelete(movieId, title) {

        Swal.fire({
            text: `Do you want to remove "${title}" from this playlist?`,
            icon: 'question',
            iconColor: '#497aa6',
            showCloseButton: true,
            showDenyButton: true,
            confirmButtonText: 'Confirm',
            allowEnterKey: false,
            customClass: {
                popup: 'Alert',
                closeButton: 'closeButton',
                confirmButton: 'confirmButton',
                denyButton: 'denyButton',
            }
        }).then((result) => {

            if (result.isConfirmed) {
                dispatch(removeMovieFromPlaylist(movieId, id, currentUser))
            }

        })
        setTimeout(() => dispatch(getPlaylistMovies(playlist.moviesId)), 1000)
    }

    function handleRandomMovieSelect() {

        setRandomMovie(movies[Math.round(Math.random() * (movies.length - 1))])
        setDisplay('flex')
    }

    function randomMovieDiv() {

        return (

            <div className={style.randomMovie}>
                <div>
                    <img src={'https://image.tmdb.org/t/p/original' + randomMovie.poster_path} />
                </div>
                <div>
                    <h2>{randomMovie.title}</h2>
                    <div className={style.buttons}>
                        <Link to={`/movies/${randomMovie.id}`}>
                            <button><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/></svg> Play</button>
                        </Link>
                        <button className={style.button} onClick={handleRandomMovieSelect}>Try Again</button>
                    </div>
                </div>
            </div>

        )
    }

    return (

        <div className={style.container}>

            {
                playlist ? Object.keys(playlist).length ?
                    <div className={style.titleAndButton}>
                        <h2>{playlist.name}</h2>
                        {screenWidth > 570 ?
                            <>
                            <h4>{currentUser.displayName}</h4>
                            <h4>Movies: {playlist.moviesId ? playlist.moviesId.length : "0 :c"}</h4>
                            </>
                            : null}
                        <div>
                            <p>Not sure what to watch?</p>
                            <button disabled={playlist.moviesId.length > 0 ? false : true } className={style.button} onClick={handleRandomMovieSelect}>Choose Randomly</button>
                        </div>

                    </div>

                    : null : null
            }


            <div className={style.playlist}>
                {movies && (movies.length > 0 ?

                    movies.map(m => {

                        return (
                            <div prop={screenWidth} className={style.movie} key={m.id}>
                                <Link to={`/movies/${m.id}`}>
                                    <img src={'https://image.tmdb.org/t/p/original' + m.poster_path} />
                                    <h4 style={m.title.length > 39 && screenWidth < 570 ? {fontSize: '10px', padding: '10px' } : null}>{m.title}</h4>
                                    <h5>{m.runtime} {screenWidth < 570 ? <br/> : null} min</h5>
                                </Link>
                                <div>
                                    <Link to={`/movies/${m.id}`}>
                                        <button className={style.play}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"/></svg> Play</button>
                                    </Link>
                                    <button className={style.delete} onClick={() => handleMovieDelete(m.id, m.title)}>X</button>
                                </div>
                            </div>
                        )
                    })
                    :
                    <p>This playlist is empty</p>)}

                {
                    randomMovie === false ? null :

                        <PopUpTemplate content={randomMovieDiv()} displayState={display} handleOnClose={() => setDisplay('none')} />

                }

            </div>

        </div>
    )
}