import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserPlaylists } from '../redux/actions/playlists'
import style from '../scss/components/_playlists.module.scss'
import { useAuth } from './contexts/AuthContext'

export default function Playlist() {

    const { currentUser } = useAuth()
    const dispatch = useDispatch()
    const playlists = useSelector(state => state.playlistsReducer.playlists)

    useEffect(() => {

        dispatch(getUserPlaylists(currentUser.uid))

    }, [currentUser])


    return (

        <div className={style.container}>

            <div className={style.titleAndButton}>
                <h2>My Playlists</h2>
                <button className={style.addPlaylistButton}>Add New Playlist</button>
            </div>

            <div className={style.playlists}>
                {playlists ?

                    playlists.map(p => {

                        return (

                            <div className={style.playlist}>
                                <Link to={`playlists/${p._id}`} >
                                    <h4>{p.name}</h4>
                                </Link>
                                <div>
                                    <button className={style.share}>Share <span><svg xmlns="http://www.w3.org/2000/svg" xmlnsSvgjs="http://svgjs.com/svgjs" xmlnsXlink="http://www.w3.org/1999/xlink" width="20" height="20"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="0 0 28 30.5"><path fill="#ff315a" d="M18,14a4,4,0,0,0-3.08,1.48l-5.1-2.35a3.64,3.64,0,0,0,0-2.26l5.1-2.35A4,4,0,1,0,14,6a4.17,4.17,0,0,0,.07.71L8.79,9.14a4,4,0,1,0,0,5.72l5.28,2.43A4.17,4.17,0,0,0,14,18a4,4,0,1,0,4-4ZM18,4a2,2,0,1,1-2,2A2,2,0,0,1,18,4ZM6,14a2,2,0,1,1,2-2A2,2,0,0,1,6,14Zm12,6a2,2,0,1,1,2-2A2,2,0,0,1,18,20Z" className="color000 svgShape" /></svg></svg></span></button>
                                    <button className={style.delete}>X</button>
                                </div>
                            </div>
                        )
                    })
                    :
                    <p style={{color: '#fff'}}>You haven't created a Playlists yet</p>}

            </div>

        </div>
    )
}

