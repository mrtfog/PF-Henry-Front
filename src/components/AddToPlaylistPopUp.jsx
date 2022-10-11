import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMovieToPlaylist, addToPlaylistDisplay, createNewPlaylist, getUserPlaylists } from '../redux/actions/playlists'
import PopUpTemplate from './PopUpTemplate'
import style from '../scss/components/_addToPlaylistPopUp.module.scss'
import { useAuth } from './contexts/AuthContext'
import { useLocation } from 'react-router-dom'

export default function AddToPlaylistPopUp() {

    const dispatch = useDispatch()

    const {pathname} = useLocation()

    const display = useSelector(state => state.playlistsReducer.formDisplay)
    const playlists = useSelector(state => state.playlistsReducer.playlists)
    const movie = useSelector(state => state.playlistsReducer.selectedMovie)
    const { currentUser } = useAuth()


    const [name, setName] = useState('')
    const [playlist, setPlaylist] = useState('')

    useEffect(() => {
        dispatch(getUserPlaylists(currentUser.uid))
    }, [])


    function handleAddMovieToPlaylist(e) {

        e.preventDefault()
        dispatch(addMovieToPlaylist(movie.id, playlist, currentUser.uid))
        alert('The movie was added to playlist successfully')
        setPlaylist('')
        dispatch(addToPlaylistDisplay('none'))
    }

    function handleCreatePlaylist(e) {

        e.preventDefault()
        dispatch(createNewPlaylist({ name: name, userId: currentUser.uid }))
        setName('')
        alert('Playlist was created')
        if(pathname.includes('/playlists')) dispatch(addToPlaylistDisplay('none'))
        dispatch(getUserPlaylists(currentUser.uid))
    
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
