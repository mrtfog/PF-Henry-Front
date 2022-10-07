import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopUpTemplate from './PopUpTemplate'
import style from '../scss/components/_addToCartPopUp.module.scss'
import { getShowtimeByMovieId, addToCartDisplay } from '../redux/actions/cart'

export default function AddToCartPopUp() {

    const dispatch = useDispatch()

    const display = useSelector( state => state.cartReducer.display)
    const movie = useSelector( state => state.cartReducer.takenTickets)

    
    const showtime = useSelector ( state => state.cartReducer.showtime)
    // console.log(showtime)

    useEffect(() => {
        dispatch(getShowtimeByMovieId(movie.id))
    }, [movie])



    function handleDisplay(){

        dispatch(addToCartDisplay('none'))
    }

    
    function selectPlaylistDiv(){

        return (

            <div className={style.container_addToCartPU}>
                <h2>Add <span>'{movie.title}'</span> tickets to cart</h2>
                <hr></hr>
                <h3>Choose Playlist</h3>

                <select onChange={(e)=> console.log(e.target.value)}>
                    {
                    showtime ? showtime.map(p =>{
                        return <option key={p._id} value={p._id}>
                            {new Date(p.dateTime).toLocaleString().replace(",", " -").substring(0, 17)}Hs • {p.format}
                            </option>
                    })
                    : <option disabled>You don't have any showtime</option>}
                </select>

            </div>
        )
    }

    return (
        
        <PopUpTemplate displayState={display} handleOnClose={handleDisplay} content={selectPlaylistDiv()}/>
    )
}
