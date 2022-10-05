import React from 'react'
import style from '../scss/components/_playlist.module.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Playlist(){

    // cuando se seleccione la pelicula para agregar a la playlist q se mande un objeto con el nombre de usuario q lo agrego + el id de la peli
    const playlist = {
        _id: 'sdhskj',
        name: 'playlist 1', 
        contributors:[{id: 34, username:'Belen'}, {id: 35, username:'Sergio'}, {id: 36, username:'Belen2'}, {id: 37, username:'Martin'},{id: 38, username:'Angela'}, {id: 39, username:'Andres'}, {id: 40, username:'Luciano'}],
        movies:[
            {
                user:'Sergio',
                movie:{
                    "_id": 459151,
                    "title": "The Boss Baby: Family Business",
                    "image": "/kv2Qk9MKFFQo4WQPaYta599HkJP.jpg",
                }

            },
            {
                user:'Belen',
                movie:{
                    "_id": 769636,
                    "title": "Code Name: Emperor",
                    "image": "/8VjVLMiPm598Kg6XmKk5m1fz0p7.jpg",
                }
            },
            {
                user:'Angela',
                movie: {
                    "_id": 948333,
                    "title": "Into the Deep",
                    "image": "/bPyBqGBYjGzyLVHJEIsCwlZejk.jpg",
                }
            }

        ]
    }

    const [randomMovie, setRandomMovie] = useState(false)
    const [display, setDisplay] = useState('none')

    function handleRandomMovieSelect(){

        setRandomMovie(playlist.movies[Math.round(Math.random() * (playlist.movies.length - 1))].movie == randomMovie ? handleRandomMovieSelect() : playlist.movies[Math.round(Math.random() * (playlist.movies.length - 1))].movie)
        setDisplay('flex')
    }

    return (

        <div className={style.container}>

            <div className={style.titleAndButton}>
                <h2>{playlist.name}</h2>
                <h4>{playlist.contributors.length > 1 ?
                playlist.contributors.map(u => u.username).join(' • ')
                : playlist.user}</h4>
                <h4>Movies: {playlist.movies.length}</h4>
                <div>
                    <p>Not sure what to watch?</p>
                    <button className={style.button} onClick={handleRandomMovieSelect}>Choose Randomly</button>
                </div>

            </div>

            <div className={style.playlist}>
                {playlist.movies.length ? 
                
                playlist.movies.map(m=>{

                    return(
                        
                        <div className={style.movie}>
                            <Link to={`/movies/${m.movie._id}`}>
                                <img src={'https://image.tmdb.org/t/p/original' + m.movie.image}/>
                                <h4>{m.movie.title}</h4>
                                <h5>{m.user}</h5>
                            </Link>
                            <div>
                                <Link to={`/movies/${m.movie._id}`}>
                                    <button  className={style.play}>► Play</button>
                                </Link>
                                <button className={style.delete}>X</button>
                            </div>
                        </div>
                    )
                })
            :
            <p>This playlist is empty</p> }
            
            {
                randomMovie === false ? null :

                <div className={style.randomMovie} style={{display: display}}>

                    <button className={`${style.delete} ${style.close}`} onClick={()=> setDisplay('none')}>X</button>
                    <div>
                        <div>
                        <img src={'https://image.tmdb.org/t/p/original' + randomMovie.image} />
                        </div>
                        <div>
                            <h2>{randomMovie.title}</h2>
                            <div className={style.buttons}>
                                <Link to={`/movies/${randomMovie._id}`}>
                                    <button>► Play</button>
                                </Link>
                                <button className={style.button} onClick={handleRandomMovieSelect}>Try Again</button>
                            </div>
                        </div>
                    </div>

            </div>

            }

            </div>
            
        </div>
    )
}
