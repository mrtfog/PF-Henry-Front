import React from 'react'
import style from '../../scss/components/Cart/_selectSeatsPopUp.module.scss'
import { selectSeatsDisplay, selectedReservation } from "../../redux/actions/cart";
import { useDispatch, useSelector } from 'react-redux'
import PopUpTemplate from '../PopUpTemplate';
import SeatPicker from '../SeatPicker'

export default function SelectSeatsPopUp() {
    const dispatch = useDispatch()

    const display = useSelector( state => state.cartReducer.displaySeats)
    const reservation = useSelector( state => state.cartReducer.selectedReservation)



    function handleDisplay(){
        dispatch(selectSeatsDisplay('none'))
    }

    
    function selectSeatsDiv(){

        return (

            <div className={style.container_selectSeats}>
                
                <SeatPicker reservation={reservation}/>

            </div>
        )
    }

    return (
        
        <PopUpTemplate displayState={display} handleOnClose={handleDisplay} content={selectSeatsDiv()}/>
    )
}
