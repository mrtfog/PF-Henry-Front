import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToPlaylistDisplay, getUserPlaylists } from '../../redux/actions/playlists'
import style from '../../scss/components/Forms/_addPlaylist.module.scss'
import Select from './Select'

export default function AddPlaylist() {

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

    return (

        <div className={style.container} style={{display: display}}>

            <div className={style.popup}>
                <button className={style.close} onClick={handleDisplay}>cancel</button>

                <h2>Add <span>"{movie.title}"</span> to playlist</h2>
                <h3>Choose Playlist</h3>
                <select onChange={(e)=> console.log(e.target.value)}>
                    {console.log(playlists)}
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

        </div>
    )
}
