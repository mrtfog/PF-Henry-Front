import React, { useEffect, useState } from 'react'
import style from '../../scss/components/Cart/_selectSeatsPopUp.module.scss'
import { selectSeatsDisplay } from "../../redux/actions/cart";
import { getAllRooms } from '../../redux/actions/rooms'
import { useDispatch, useSelector } from 'react-redux'
import PopUpTemplate from '../common/PopUpTemplate';
import SeatPicker from './SeatPicker';
import { getAllShowtimes } from '../../redux/actions/showtimes';
import Swal from "sweetalert2"

export default function SelectSeatsPopUp() {
    const dispatch = useDispatch()

    const display = useSelector(state => state.cartReducer.displaySeats)
    const reservation = useSelector(state => state.cartReducer.selectedReservation)
    const movieTheaters = useSelector(state => state.roomReducer.rooms)
    const showtime = useSelector(state => state.showtimesReducer.showtimes).filter(s => s._id === reservation.showtimeId)

    const [seatsSelected, setSeatsSelected] = useState([])

    const rooms = movieTheaters ? movieTheaters.map((e) => {

        const type = e.columns <= 10 ? 'Small' : e.columns === 12 ? 'Regular' : 'Premiere'
        return { value: e._id, label: `N° ${e.number} - Size: ${type}` }
    }) : []

    useEffect(() => {
        dispatch(getAllRooms())
        dispatch(getAllShowtimes())
    }, [])

    function handleDisplay() {

        Swal.fire({
            text: 'Do you want to cancel your seats selection?',
            icon: 'question',
            iconColor: "#497aa6",
            showDenyButton: true,
            showCloseButton: true,
            confirmButtonText: 'Select seats',
            denyButtonText: 'Cancel selection',
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
                    return
                } else if (result.isDenied) {
                    setSeatsSelected([])
                    return dispatch(selectSeatsDisplay('none'))
                }
            })

    }


    function selectSeatsDiv() {

        return (

            <div className={style.container_selectSeats}>

                <SeatPicker reservation={reservation} movieTheaters={movieTheaters} showtime={showtime} rooms={rooms} seatsSelected={seatsSelected} setSeatsSelected={setSeatsSelected} />

            </div>
        )
    }

    return (

        <PopUpTemplate width='85vw' height='90vh' top='5vh' displayState={display} handleOnClose={handleDisplay} content={selectSeatsDiv()} />
    )
}
