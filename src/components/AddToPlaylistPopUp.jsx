import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMovieToPlaylist, addToPlaylistDisplay, createNewPlaylist, getUserPlaylists } from '../redux/actions/playlists'
import PopUpTemplate from './PopUpTemplate'
import style from '../scss/components/_addToPlaylistPopUp.module.scss'

export default function AddToPlaylistPopUp() {
    
    const dispatch = useDispatch()

    const display = useSelector(state => state.playlistsReducer.formDisplay)
    const playlists = useSelector(state => state.playlistsReducer.playlists)
    const movie = useSelector(state => state.playlistsReducer.selectedMovie)


    const [name, setName] = useState('')
    const [playlist, setPlaylist] = useState('')

    useEffect(()=>{
        dispatch(getUserPlaylists())
    }, [])

    function handleAddMovieToPlaylist(e){

        e.preventDefault()
        dispatch(addMovieToPlaylist({listId: playlist, userId: undefined}))
        alert('The movie was added to playlist successfully')
        setPlaylist('')
    }

    function handleCreatePlaylist(e){

        e.preventDefault()
        dispatch(createNewPlaylist({name: name, userId: undefined}))
        setName('')
        alert('Playlist was created')
        dispatch(getUserPlaylists())
    }

    function handleDisplay(){

        dispatch(addToPlaylistDisplay('none'))
    }

    function selectPlaylistDiv(){

        return (

            <div className={style.container}>
                <h2>Add <span>'{movie.title}'</span> to playlist</h2>
                <hr></hr>
                <h3>Choose Playlist</h3>
                <div className={style.addToPlaylist}>
                    <select onChange={(e)=> setPlaylist(e.target.value)}>
                        <option selected disabled value=''>My Playlists</option>
                        {
                        playlists ? playlists.map(p =>{

                            return <option key={p._id} value={p._id}>{p.name}</option>
                        })
                        : <option disabled>You don't have any playlist</option>}
                    </select>
                    <button disabled={playlist === '' ? true : false}onClick={e => handleAddMovieToPlaylist(e)}>Add</button>
                </div>

                <h5>or</h5>

                <h3>Create new Playlist</h3>
                <div className={style.createPlaylist}>
                    <input type='text' placeholder='Playlist Name...' value={name} onChange={(e) => setName(e.target.value)}/>
                    <button disabled={name.trim() === '' ? true : false} onClick={e =>handleCreatePlaylist(e)}>+</button>
                </div>

            </div>
        )
    }

    return (
        
        <PopUpTemplate displayState={display} handleOnClose={()=> handleDisplay()} content={selectPlaylistDiv()}/>
    )
}
