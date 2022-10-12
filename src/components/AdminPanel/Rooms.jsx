import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms, postNewRoom } from "../../redux/actions/rooms";
import { useAuth } from '../contexts/AuthContext';

import style from '../../scss/components/AdminPanel/_rooms.module.scss'
import { useEffect } from 'react';

function Rooms() {

const {currentUser} = useAuth()
const dispatch = useDispatch()
//const movies = useSelector((state) => state.moviesReducer.movies);
//const functions = useSelector((state) => state.showtimesReducer.showtimes);
const roomsBackend = useSelector((state)=> state.roomReducer.rooms)


/*
            Columns         Pasillo
                🔽 
                
                 1 2 3 4 5 6  null  7 8 9 10
    
  Rows ->   A    1 2 3 4 5 6  null  7 8 9 10
            B    1 2 3 4 5 6  null  7 8 9 10    
            C    1 2 3 4 5 6  null  7 8 9 10
            D    1 2 3 4 5 6  null  7 8 9 10
            F    1 2 3 4 5 6  null  7 8 9 10
            G    1 2 3 4 5 6  null  7 8 9 10                       
*/

    const [room, setRoom] = useState('')
    const [selectValue, setSelectValue] = useState('')

    const roomTypes = {
       small: { columns: 10, rows: 10 },
       medium: { columns: 15, rows: 15 },
       big: { columns: 20, rows: 20 }
    }
    
    function handleSelect(e) {
        setRoom(roomTypes[e.target.value])
        //console.log('Esto es selectValue ->', e.target.value)
        setSelectValue(e.target.value)
        //console.log('Esto es room ->', roomTypes[e.target.value])
    }

    function handleSubmit() {
        console.log('Esto es roomBackend ->', roomsBackend)
        dispatch(postNewRoom({...room, number: roomsBackend.length+1}, currentUser))
        console.log('Esto es lo que enviamos ->', {...room, number: roomsBackend.length+1})
        dispatch(getAllRooms())
        setRoom('')
    }

    useEffect(()=>{
        dispatch(getAllRooms());
    },[roomsBackend])

  return (
    <div className={style.mainContainer}>
        <form >
            <h2>Movie Theater Creation</h2>
            <div className={style.subtitleContainer}>
                    {
                        <p>Create movie theater number: <span>{roomsBackend.length+1}</span></p>
                    }
                </div>
            <div className={style.inputContainer}>
                <label className={style.malditoLabel}>Select room type</label>
                <select value={selectValue} onChange={(e) => handleSelect(e)}>
                    <option disabled value="">Select type room</option>
                    <option value="big">Premiere</option>
                    <option value="medium">Regular</option>
                    <option value="small">Small</option>
                </select>
            </div>

            <button onClick={handleSubmit} type='submit' disabled={room === '' ? true : false}>Create</button>
        </form>
        <div>
            <h2>Created Movie Theaters</h2>
            <div className={style.roomCardsContainer}>
            
                {roomsBackend ? roomsBackend.map((e) => { 

                const type = e.rows <= 10 ? 'Small' : e.rows === 15 ? 'Regular' : 'Premiere'
            
                return <div className={style.roomCard}>
                    <p> Movie theater <span>N° {e.number}</span> - Size: <span>{type}</span></p>
                </div>

                }) : null }
            </div>
        </div>

    </div>
  )
}

export default Rooms