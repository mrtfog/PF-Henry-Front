import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToPlaylistDisplay, deletePlaylist, getUserPlaylists } from '../../redux/actions/playlists'
import style from '../../scss/components/Playlist/_playlists.module.scss'
import { useAuth } from '../../contexts/AuthContext'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

export default function Playlist() {

    const { currentUser } = useAuth()
    const dispatch = useDispatch()
    const playlists = useSelector(state => state.playlistsReducer.playlists)

    useEffect(() => {

        dispatch(getUserPlaylists(currentUser))

    }, [currentUser])

    function handleDelete(playlist){

        Swal.fire({
            text:`Are you sure you want to delete '${playlist.name}' ?`,
            icon: 'question',
            iconColor: '#497aa6',
            showCloseButton: true,
            showDenyButton: true,
            denyButtonText: 'No, cancel delete',
            confirmButtonText: 'Yes, I am sure',
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
                dispatch(deletePlaylist(playlist._id, currentUser))
            }
        })
        
    }



    return (

        <div className={style.container}>

            <div className={style.titleAndButton}>
                <h2>My Playlists</h2>
                <button onClick={()=> dispatch(addToPlaylistDisplay('flex'))}className={style.addPlaylistButton}>Add New Playlist</button>
            </div>

            <div className={style.playlists}>
                {playlists ?

                    playlists.map(p => {

                        return (

                            <div className={style.playlist}>
                                <Link to={`playlists/${p._id}`} >
                                    <h4>{p.name}</h4>
                                    <p>Movies: {p.moviesId.length}</p>
                                </Link>
                                <button onClick={()=> handleDelete(p)}className={style.delete}>X</button>

                            </div>
                        )
                    })
                    :
                    <p>You have not created a playlist yet</p>}

            </div>

        </div>
    )
}

