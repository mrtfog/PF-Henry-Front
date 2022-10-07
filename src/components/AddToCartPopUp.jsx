import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopUpTemplate from './PopUpTemplate'
import style from '../scss/components/_addToCartPopUp.module.scss'

export default function AddToCartPopUp() {

    const dispatch = useDispatch()

    const display = useSelector( state => state.cartReducer.display)
    const movie = useSelector( state => state.cartReducer.takenTickets)


    
    function selectPlaylistDiv(){

        return (

            <div className={style.container_addToCartPU}>
                <h2>Add <span>'{movie.title}'</span> tickets to cart</h2>
                <hr></hr>
                <h3>Choose Playlist</h3>



                {/* <select onChange={(e)=> console.log(e.target.value)}>
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
                </div> */}

            </div>
        )
    }

    return (
        
        <PopUpTemplate displayState={display} handleOnClose={handleDisplay} content={selectPlaylistDiv()}/>
    )
}
