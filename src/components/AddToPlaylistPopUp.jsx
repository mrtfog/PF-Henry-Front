import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMovieToPlaylist, addToPlaylistDisplay, createNewPlaylist, getPlaylistMovies, getUserPlaylists } from '../redux/actions/playlists'
import PopUpTemplate from './PopUpTemplate'
import style from '../scss/components/_addToPlaylistPopUp.module.scss'
import { useAuth } from './contexts/AuthContext'
import { useHistory, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'

export default function AddToPlaylistPopUp() {

    const dispatch = useDispatch()

    const {pathname} = useLocation()

    const history = useHistory()

    const display = useSelector(state => state.playlistsReducer.formDisplay)
    const playlists = useSelector(state => state.playlistsReducer.playlists)
    const movie = useSelector(state => state.playlistsReducer.selectedMovie)
    const { currentUser } = useAuth()


    const [name, setName] = useState('')
    const [playlist, setPlaylist] = useState('')

    useEffect(() => {
        dispatch(getUserPlaylists(currentUser))
    }, [])


    function handleAddMovieToPlaylist(e) {

        e.preventDefault()
        dispatch(addMovieToPlaylist(movie.id, playlist, currentUser))
        Swal.fire({
            text:`"${movie.title}" was added to "${playlists.find(p => p._id === playlist).name}" playlist successfully`,
            icon: 'success',
            iconColor: '#497aa6',
            showCloseButton: true,
            showDenyButton: true,
            denyButtonText: 'Continue',
            confirmButtonText: 'Go to playlist',
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
                history.push(`/playlists/${playlist}`)
                setPlaylist('')
            }

            if(result.isDenied){
                
                setPlaylist('')
            }
        })
        dispatch(addToPlaylistDisplay('none'))

    }

    function handleCreatePlaylist(e) {

        e.preventDefault()
        dispatch(createNewPlaylist({ name: name, userId: currentUser.uid }, currentUser))
        setName('')

        if(pathname.includes('/playlists')){

            Swal.fire({
                text:`"${name}" playlist was created successfully`,
                icon: 'success',
                iconColor: '#497aa6',
                confirmButtonText: 'Continue',
                showCloseButton: true,
                allowEnterKey: false,
                customClass: {
                    popup: 'Alert',
                    closeButton: 'closeButton',
                    confirmButton: 'confirmButton',
                    denyButton: 'denyButton',
                }
            })
        }
        else{
            
            Swal.fire({
                text:`"${name}" playlist was created successfully`,
                icon: 'success',
                iconColor: '#497aa6',
                showCloseButton: true,
                showDenyButton: true,
                denyButtonText: 'Continue',
                confirmButtonText: 'See my playlists',
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
                    history.push(`/playlists`)
                    dispatch(addToPlaylistDisplay('none'))
                }
            })
        }
        if(pathname.includes('/playlists')) dispatch(addToPlaylistDisplay('none'))
        dispatch(getUserPlaylists(currentUser))
    
    }

    function handleDisplay() {

        dispatch(addToPlaylistDisplay('none'))
        setName('')
        setPlaylist('')
    }

    function selectPlaylistDiv() {

        if(!pathname.includes('/playlists')){

            return (

            
                <div className={style.container}>
                    <h2>Add <span>'{movie.title}'</span> to playlist</h2>
                    <hr></hr>
                    <h3>Choose Playlist</h3>
                    <div className={style.addToPlaylist}>
                        <select value={playlist} onChange={(e) => setPlaylist(e.target.value)}>
                            <option selected disabled value=''>My Playlists</option>
                            {
                                playlists.length ? playlists.map(p => {
    
                                    return <option key={p._id} value={p._id}>{p.name}</option>
                                })
                                    : <option disabled>You don't have any playlist</option>
                            }
                        </select>
                        <button disabled={playlist === '' ? true : false} onClick={e => handleAddMovieToPlaylist(e)}>Add</button>
                    </div>
    
                    <h5>or</h5>
    
                    <h3>Create new Playlist</h3>
                    <div className={style.createPlaylist}>
                        <input type='text' placeholder='Playlist Name...' value={name} onChange={(e) => setName(e.target.value)} />
                        <button disabled={name.trim() === '' ? true : false} onClick={e => handleCreatePlaylist(e)}>+</button>
                    </div>
    
                </div>
            )
        }

        else{

            return (

        
                <div className={style.container}>
    
                    <h3>Create new Playlist</h3>
                    <div className={style.createPlaylist}>
                        <input type='text' placeholder='Playlist Name...' value={name} onChange={(e) => setName(e.target.value)} />
                        <button disabled={name.trim() === '' ? true : false} onClick={e => handleCreatePlaylist(e)}>+</button>
                    </div>
    
                </div>
            )
        }
        
    }

    return (

        <PopUpTemplate displayState={display} handleOnClose={() => handleDisplay()} content={selectPlaylistDiv()} />
    )
}
