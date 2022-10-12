import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopUpTemplate from './PopUpTemplate'
import style from '../scss/components/_addToCartPopUp.module.scss'
import { getShowtimeByMovieId, addToCartDisplay, addToCart } from '../redux/actions/cart'
import { useHistory } from 'react-router-dom'

export default function AddToCartPopUp() {

    const history = useHistory()

    const dispatch = useDispatch()

    const display = useSelector(state => state.cartReducer.displayCart)
    const movie = useSelector(state => state.cartReducer.takenTickets)
    const showtimes = useSelector(state => state.cartReducer.showtime)
    const cart = useSelector(state => state.cartReducer.cart)
    const cartShowtimesIds = Array.from(new Set(cart.map(s=>s.showtimeId)))



    //==================ESTADO DEL CONTADOR / FUNCION SELECCIONADA ==================

    const [value, setValue] = useState(1)
    const [selectValue, setSelectValue] = useState('') 

    const [selectedShowtime, setSelectedShowtime] = useState({})



    //======================= SE DEBE DEFINIR DONDE PASAR EL PRECIO ========================//
    //======================= SE DEBE DEFINIR DONDE PASAR EL PRECIO ========================//
    //======================= SE DEBE DEFINIR DONDE PASAR EL PRECIO ========================//
    //======================= SE DEBE DEFINIR DONDE PASAR EL PRECIO ========================//
    //======================= SE DEBE DEFINIR DONDE PASAR EL PRECIO ========================//


    useEffect(() => {
        dispatch(getShowtimeByMovieId(movie.id))
    }, [movie])

    function handleDisplay() {
        dispatch(addToCartDisplay('none'))
        setValue(1)
        setSelectedShowtime('')
        setSelectValue('')
    }

    function handleSelectChange(index) {

        setSelectedShowtime({
            showtimeId: showtimes[index]._id,
            movieTitle: showtimes[index].movieTitle,
            image: showtimes[index].image,
            dateTime: showtimes[index].dateTime,
            format: showtimes[index].format,
            roomId: showtimes[index].roomId,
            ticketPrice: showtimes[index].ticketPrice
        })

        setSelectValue(index)
    }
    
    function handleSubmit() {
        
        if (cartShowtimesIds.includes(selectedShowtime.showtimeId)) {
            alert('You already selected this showtime, check your cart')
            history.push('/cart')
        } else {
            dispatch(addToCart({ ...selectedShowtime, movieId: movie.id, tickets: value }))
            alert('Reservation added to cart')
        }
        
        dispatch(addToCartDisplay('none'))
        setSelectedShowtime('')
        setSelectValue('')
        setValue(1)
        
    }


    function selectPlaylistDiv() {

        return (

            <div className={style.container_addToCartPU}>
                <h2>Add<span>'{movie.title}'</span>tickets to cart</h2>
                <hr></hr>
                <h3>Choose showtime</h3>

                <select value = {selectValue} onChange={(e) => handleSelectChange(e.target.value)}>
                    <option value = ''>Select showtime</option>
                    {
                        showtimes.length ? showtimes.map((p, index) => {
                            return <option key={p._id} value={index}>

                                {new Date(p.dateTime).toLocaleString().replace(",", " -").substring(0, 17)}Hs • {p.format}
                            </option>
                        })
                            : <option disabled>You don't have any showtime</option>}
                </select>

                <h3>How many tickets?</h3>
                <div className={style.counter}>
                    <span className={style.minus} onClick={() => value <= 1 ? setValue(value) : setValue(value - 1)}><p>-</p></span>
                    <input type="number" className={style.count} value={value} />
                    <span className={style.plus} onClick={() => setValue(value < 10 ? value + 1 : value)}><p>+</p></span>
                </div>
                <button type='submit' disabled={selectValue===''? true : false} onClick={() => handleSubmit()}>Add to cart</button>

            </div>
        )
    }

    return (

        <PopUpTemplate displayState={display} handleOnClose={handleDisplay} content={selectPlaylistDiv()} />
    )
}
