import React from 'react'
import style from '../scss/components/_playlist.module.scss'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { clearPlaylistMovies, getPlaylist, getPlaylistMovies, removeMovieFromPlaylist } from '../redux/actions/playlists'
import PopUpTemplate from './PopUpTemplate'
import { useAuth } from './contexts/AuthContext'

export default function Playlist() {

    const { currentUser } = useAuth()
    const dispatch = useDispatch()

    const { id } = useParams()

    const playlist = useSelector(state => state.playlistsReducer.selectedPlaylist)
    const movies = useSelector(state => state.playlistsReducer.movies)

    useEffect(() => {

        dispatch(getPlaylist(id))

    }, [id])

    useEffect(() => {
        if (playlist) dispatch(getPlaylistMovies(playlist.moviesId))
        return () => dispatch(clearPlaylistMovies())

    }, [playlist])

    const [randomMovie, setRandomMovie] = useState(false)
    const [display, setDisplay] = useState('none')


    function handleMovieDelete(movieId, title) {

        dispatch(removeMovieFromPlaylist(movieId, id, currentUser.uid))
        alert(`"${title}" was successfully removed from the playlist`)
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
                            <button>► Play</button>
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
                        <h4>{playlist.contributors ?
                            playlist.contributors.map(u => u.username).join(' • ')
                            : playlist.userId}</h4>
                        <h4>Movies: {playlist.moviesId ? playlist.moviesId.length : "0 :c"}</h4>
                        <div>
                            <p>Not sure what to watch?</p>
                            <button className={style.button} onClick={handleRandomMovieSelect}>Choose Randomly</button>
                        </div>

                    </div>

                    : null : null
            }


            <div className={style.playlist}>
                {movies && (movies.length > 0 ?

                    movies.map(m => {

                        return (

                            <div className={style.movie} key={m.id}>
                                <Link to={`/movies/${m.id}`}>
                                    <img src={'https://image.tmdb.org/t/p/original' + m.poster_path} />
                                    <h4>{m.title}</h4>
                                    <h5>{m.runtime} min</h5>
                                </Link>
                                <div>
                                    <Link to={`/movies/${m.id}`}>
                                        <button className={style.play}>► Play</button>
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
