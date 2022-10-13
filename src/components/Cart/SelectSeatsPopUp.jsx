import React,{ useEffect } from 'react'
import style from '../../scss/components/Cart/_selectSeatsPopUp.module.scss'
import { selectSeatsDisplay } from "../../redux/actions/cart";
import { getAllRooms } from '../../redux/actions/rooms'
import { useDispatch, useSelector } from 'react-redux'
import PopUpTemplate from '../PopUpTemplate';
import SeatPicker from '../SeatPicker'
import { getAllShowtimes } from '../../redux/actions/showtimes';

export default function SelectSeatsPopUp() {
    const dispatch = useDispatch()

    const display = useSelector( state => state.cartReducer.displaySeats)
    const reservation = useSelector( state => state.cartReducer.selectedReservation)
    const movieTheaters = useSelector ( state => state.roomReducer.rooms)
    const showtime = useSelector(state=> state.showtimesReducer.showtimes).filter(s=>s._id===reservation.showtimeId)

    console.log('Showtime en popup', showtime)
    useEffect(() => {
      dispatch(getAllRooms())
      dispatch(getAllShowtimes())
    }, [])
    


    function handleDisplay(){
        dispatch(selectSeatsDisplay('none'))
    }

    
    function selectSeatsDiv(){

        return (

            <div className={style.container_selectSeats}>
                
                <SeatPicker reservation={reservation} movieTheaters={movieTheaters} showtime={showtime}/>

            </div>
        )
    }

    return (
        
        <PopUpTemplate displayState={display} handleOnClose={handleDisplay} content={selectSeatsDiv()}/>
    )
}
