import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopUpTemplate from './PopUpTemplate'
import style from '../scss/components/_addToCartPopUp.module.scss'
import { getShowtimeByMovieId, addToCartDisplay, postCart } from '../redux/actions/cart'
import { useHistory } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js';


export default function AddToCartPopUp() {
    const { currentUser } = useAuth();
    const history = useHistory()

    const dispatch = useDispatch()

    const display = useSelector(state => state.cartReducer.displayCart)
    const movie = useSelector(state => state.cartReducer.takenTickets)
    const showtimes = useSelector(state => state.cartReducer.showtime)
    const cart = useSelector(state => state.cartReducer.newCart)
    const cartShowtimesIds = Array.from(new Set(cart.map(s => s.showtimeId)))


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
        if (movie.id) dispatch(getShowtimeByMovieId(movie.id))
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
            Swal.fire({
                text: 'You already selected this showtime, check your cart',
                icon: 'warning',
                iconColor: '#497aa6',
                showCloseButton: true,
                confirmButtonText: 'Go to cart',
                denyButtonText: 'Continue',
                allowEnterKey: false,
                customClass: {
                    popup: 'Alert',
                    closeButton: 'closeButton',
                    confirmButton: 'confirmButton',
                    denyButton: 'denyButton',
                }
            })
                .then((result) => {

                    if (result.isConfirmed) {

                        history.push('/cart')
                    }
                })


        } else {

            if (currentUser) {
                dispatch(postCart({ showtimeId: selectedShowtime.showtimeId, userId: currentUser.uid, price: selectedShowtime.ticketPrice * value, type: 'standard', ticketAmount: value }, currentUser.accessToken))
            } else {
                const sessionCart = JSON.parse(sessionStorage.getItem("newCart"))
                console.log(selectedShowtime)
                sessionStorage.setItem("newCart", JSON.stringify([...sessionCart, { showtimeId: selectedShowtime.showtimeId, price: selectedShowtime.ticketPrice * value, type: 'standard', ticketAmount: value }]))
            }

            Swal.fire({
                text: 'Reservation added to cart',
                icon: 'success',
                iconColor: '#497aa6',
                showCloseButton: true,
                showDenyButton: true,
                denyButtonText: 'Continue',
                confirmButtonText: 'Go to cart',
                allowEnterKey: false,
                customClass: {
                    popup: 'Alert',
                    closeButton: 'closeButton',
                    confirmButton: 'confirmButton',
                    denyButton: 'denyButton',
                }
            })
                .then((result) => {

                    if (result.isConfirmed) {

                        history.push(`/cart`)
                        dispatch(addToCartDisplay('none'))
                    }
                })
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

                <select value={selectValue} onChange={(e) => handleSelectChange(e.target.value)}>
                    <option value=''>Select showtime</option>
                    {
                        showtimes.length ? showtimes.map((p, index) => {
                            return <option key={p._id} value={index}>

                                {new Date(p.dateTime).toLocaleString().replace(",", " -").substring(0, 17)}Hs • {p.format} • ${p.ticketPrice}
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
                <button type='submit' disabled={selectValue === '' ? true : false} onClick={() => handleSubmit()}>Add to cart</button>

            </div>
        )
    }

    return (

        <PopUpTemplate displayState={display} handleOnClose={handleDisplay} content={selectPlaylistDiv()} />
    )
}
