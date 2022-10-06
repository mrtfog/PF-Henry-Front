import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToPlaylistDisplay, getUserPlaylists } from '../redux/actions/playlists'
import PopUpTemplate from './PopUpTemplate'
import style from '../scss/components/_addToPlaylistPopUp.module.scss'

export default function AddToPlaylistPopUp() {
    
    const dispatch = useDispatch()

    const display = useSelector(state => state.playlistsReducer.formDisplay)
    const playlists = useSelector(state => state.playlistsReducer.playlists)
    const movie = useSelector(state => state.playlistsReducer.selectedMovie)


    const [name, setName] = useState('')

    useEffect(()=>{
        dispatch(getUserPlaylists())
    }, [])

    function handleDisplay(){

        dispatch(addToPlaylistDisplay('none'))
    }

    function selectPlaylistDiv(){

        return (

            <div className={style.container}>
                <h2>Add <span>"{movie.title}"</span> to playlist</h2>
                <hr></hr>
                <h3>Choose Playlist</h3>
                <select onChange={(e)=> console.log(e.target.value)}>
                    {
                    playlists ? playlists.map(p =>{

                        return <option key={p._id} value={p._id}>{p.name}</option>
                    })
                    : <option disabled>You don't have any playlist</option>}
                </select>

                <h5>or</h5>

                <h3>Create new Playlist</h3>
                <div className={style.createPlaylist}>
                    <input type='text' placeholder='Playlist Name...' value={name} onChange={(e) => setName(e.target.value)}/>
                    <button>+</button>
                </div>

            </div>
        )
    }

    return (
        
        <PopUpTemplate displayState={display} handleOnClose={handleDisplay} content={selectPlaylistDiv()}/>
    )
}
