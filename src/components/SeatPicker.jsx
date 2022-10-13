import React, {useState, useEffect} from 'react'
import "../scss/components/_seatPicker.scss"
import { useAuth } from './contexts/AuthContext'
import { selectedSeats, selectSeatsDisplay } from '../redux/actions/cart'
import { getAllRooms } from '../redux/actions/rooms'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'


let seatsReserved = 0

export default function Seats({reservation, movieTheaters}) {


    
    const dispatch = useDispatch()

    let tickets = reservation.tickets
    let { currentUser } = useAuth()

    let userId = currentUser.uid

    const [seatsSelected, setSeatsSelected] = useState([])

    const [ seatsId, setSeatsId ] = useState([])

    const selectedMovieTheater = movieTheaters?.find (r=>r._id=== reservation.roomId)


    //   let indexHalls 
    //   function setIndexHalls(){

    //       if(selectedMovieTheater.columns === 10){
    //            indexHalls = { firstHall: 2, secondHall: 8}
    //       } else if(selectedMovieTheater.columns === 12){
    //           indexHalls = { firstHall: 3, secondHall: 9}
    //      } else {
    //       indexHalls = { firstHall: 3, secondHall: 12}
    //      }
    //   }

    //   console.log('indexHalls', indexHalls)

    let rowNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const [selected, setSelected] = useState([
        [
        { showtimeId: '1', _id: "A1", location: "A1" },
        { showtimeId: '1', _id: 'A2', location: "A2" },
        { showtimeId: '1', _id: 'A3', location: "A3" },
        { showtimeId: '1', _id: 'A4', location: "A4" },
        { showtimeId: '1', _id: 'A5', location: "A5" },
        { showtimeId: '1', _id: 'A6', location: "A6" },
        { showtimeId: '1', _id: 'A7', location: "A7" },
        { showtimeId: '1', _id: 'A8', location: "A8" },
        { showtimeId: '1', _id: 'A9', location: "A9" },
        { showtimeId: '1', _id: 'A10', location: "A10" },
        { showtimeId: '1', _id: 'A11', location: "A11" },
        { showtimeId: '1', _id: 'A12', location: "A12" },
        { showtimeId: '1', _id: 'A13', location: "A13", userId: '1' },
        { showtimeId: '1', _id: 'A14', location: "A14" },
        { showtimeId: '1', _id: 'A15', location: "A15" }

        ],
        [
        { showtimeId: '1', _id: 'B1', location: "B1" },
        { showtimeId: '1', _id: 'B2', location: "B2" },
        { showtimeId: '1', _id: 'B3', location: "B3", userId: '1' },        
        { showtimeId: '1', _id: 'B4', location: "B4" },
        { showtimeId: '1', _id: 'B5', location: "B5" },
        { showtimeId: '1', _id: 'B6', location: "B6" },
        { showtimeId: '1', _id: 'B7', location: "B7" },
        { showtimeId: '1', _id: 'B8', location: "B8" },
        { showtimeId: '1', _id: 'B9', location: "B9" },
        { showtimeId: '1', _id: 'B10', location: "B10" },        
        { showtimeId: '1', _id: 'B11', location: "B11" },
        { showtimeId: '1', _id: 'B12', location: "B12" },
        { showtimeId: '1', _id: 'B13', location: "B13" },
        { showtimeId: '1', _id: 'B14', location: "B14" },
        { showtimeId: '1', _id: 'B15', location: "B15" }

            ],
            [
            { showtimeId: '1', _id: 'C1', location: "C1" },
            { showtimeId: '1', _id: 'C2', location: "C2" },
            { showtimeId: '1', _id: 'C3', location: "C3" },
            { showtimeId: '1', _id: 'C4', location: "C4" },
            { showtimeId: '1', _id: 'C5', location: "C5" },
            { showtimeId: '1', _id: 'C6', location: "C6" },
            { showtimeId: '1', _id: 'C7', location: "C7" },
            { showtimeId: '1', _id: 'C8', location: "C8" },
            { showtimeId: '1', _id: 'C9', location: "C9" },
            { showtimeId: '1', _id: 'C10', location: "C10" },            
            { showtimeId: '1', _id: 'C11', location: "C11", userId: '1' },
            { showtimeId: '1', _id: 'C12', location: "C12" },
            { showtimeId: '1', _id: 'C13', location: "C13" },
            { showtimeId: '1', _id: 'C14', location: "C14" },
            { showtimeId: '1', _id: 'C15', location: "C15" }

            ],
            [
            { showtimeId: '1', _id: 'D1', location: "D1" },
            { showtimeId: '1', _id: 'D2', location: "D2" },
            { showtimeId: '1', _id: 'D3', location: "D3", userId: '1' },
            { showtimeId: '1', _id: 'D4', location: "D4" },
            { showtimeId: '1', _id: 'D5', location: "D5" },
            { showtimeId: '1', _id: 'D6', location: "D6" },
            { showtimeId: '1', _id: 'D7', location: "D7" },
            { showtimeId: '1', _id: 'D8', location: "D8" },
            { showtimeId: '1', _id: 'D9', location: "D9" },
            { showtimeId: '1', _id: 'D10', location: "D10" },            
            { showtimeId: '1', _id: 'D11', location: "D11" },
            { showtimeId: '1', _id: 'D12', location: "D12" },
            { showtimeId: '1', _id: 'D13', location: "D13" },
            { showtimeId: '1', _id: 'D14', location: "D14" },
            { showtimeId: '1', _id: 'D15', location: "D15" }

            ],
            [
            { showtimeId: '1', _id: 'E1', location: "E1" },
            { showtimeId: '1', _id: 'E2', location: "E2" },
            { showtimeId: '1', _id: 'E3', location: "E3" },            
            { showtimeId: '1', _id: 'E4', location: "E4" },
            { showtimeId: '1', _id: 'E5', location: "E5" },
            { showtimeId: '1', _id: 'E6', location: "E6" },
            { showtimeId: '1', _id: 'E7', location: "E7" },
            { showtimeId: '1', _id: 'E8', location: "E8" },
            { showtimeId: '1', _id: 'E9', location: "E9" },
            { showtimeId: '1', _id: 'E10', location: "E10" },        
            { showtimeId: '1', _id: 'E11', location: "E11" },
            { showtimeId: '1', _id: 'E12', location: "E12" },
            { showtimeId: '1', _id: 'E13', location: "E13" },
            { showtimeId: '1', _id: 'E14', location: "E14" },
            { showtimeId: '1', _id: 'E15', location: "E15" }
            ],
            [
            { showtimeId: '1', _id: 'F1', location: "F1" },
            { showtimeId: '1', _id: 'F2', location: "F2" },
            { showtimeId: '1', _id: 'F3', location: "F3" },
            { showtimeId: '1', _id: 'F4', location: "F4" },
            { showtimeId: '1', _id: 'F5', location: "F5" },
            { showtimeId: '1', _id: 'F6', location: "F6" },
            { showtimeId: '1', _id: 'F7', location: "F7" },
            { showtimeId: '1', _id: 'F8', location: "F8" },
            { showtimeId: '1', _id: 'F9', location: "F9" },
            { showtimeId: '1', _id: 'F10', location: "F10" },
            { showtimeId: '1', _id: 'F11', location: "F11" },
            { showtimeId: '1', _id: 'F12', location: "F12" },
            { showtimeId: '1', _id: 'F13', location: "F13" },
            { showtimeId: '1', _id: 'F14', location: "F14" },
            { showtimeId: '1', _id: 'F15', location: "F15" }
            ],
            [
            { showtimeId: '1', _id: 'G1', location: "G1" },
            { showtimeId: '1', _id: 'G2', location: "G2" },
            { showtimeId: '1', _id: 'G3', location: "G3" },
            { showtimeId: '1', _id: 'G4', location: "G4" },
            { showtimeId: '1', _id: 'G5', location: "G5" },
            { showtimeId: '1', _id: 'G6', location: "G6" },
            { showtimeId: '1', _id: 'G7', location: "G7", userId: '1' },
            { showtimeId: '1', _id: 'G8', location: "G8" },
            { showtimeId: '1', _id: 'G9', location: "G9" },
            { showtimeId: '1', _id: 'G10', location: "G10" },
            { showtimeId: '1', _id: 'G11', location: "G11" },
            { showtimeId: '1', _id: 'G12', location: "G12" },
            { showtimeId: '1', _id: 'G13', location: "G13" },
            { showtimeId: '1', _id: 'G14', location: "G14" },
            { showtimeId: '1', _id: 'G15', location: "G15" }
            ]
        ]
    );

 /*======================= Submit de info a reducer ======================= */    
    
    function handleOnConfirmSeats(){
        dispatch(selectedSeats(seatsId, userId, reservation.showtimeId))
        Swal.fire({
            text:'Seats correctly selected',
            icon: 'success',
            iconColor: '#497aa6',
            showCloseButton: true,
            confirmButtonText: 'Continue',
            allowEnterKey: false,
            customClass: {
                popup: 'Alert',
                closeButton: 'closeButton',
                confirmButton: 'confirmButton',
                denyButton: 'denyButton',
            }
        })
        dispatch(selectSeatsDisplay('none'))
    }





/*======================= CAMBIOS DE SELECCION EN ASIENTOS ======================= */  

function handleClick(e){
    let initialState = selected
    let seatSelected = e.target.innerText
    if(e.target.className === "seat seat--enabled"){

        if (seatsReserved===tickets) return alert('All seats already selected')
        e.target.className = "seat seat--selected"
        
        for (let i = 0; i < initialState.length; i++) {

            for (let j = 0; j < initialState[i].length; j++) {
            
                if (initialState[i][j]!==null){

                    if(initialState[i][j].location===seatSelected){

                        initialState[i][j] = { 
                            
                            showtimeId : initialState[i][j].showtimeId,
                            _id : initialState[i][j]._id,
                            location : initialState[i][j].location,
                            userId : userId
                        }
                        seatsReserved=seatsReserved+1
                        setSeatsSelected(seatsSelected.concat(initialState[i][j].location))  
                        setSeatsId(seatsId.concat(initialState[i][j]._id))
                    }
                } else  continue
            }
        }

    } 
    else {
        e.target.className = "seat seat--enabled"
        for (let i = 0; i < initialState.length; i++) {
            for (let j = 0; j < initialState[i].length; j++) {
                
                if (initialState[i][j]!==null){

                    if(initialState[i][j].location===seatSelected){
                        initialState[i][j] = { 
                            showtimeId : initialState[i][j].showtimeId,                      
                            _id : initialState[i][j]._id,                      
                            location : initialState[i][j].location,
                        }
                        seatsReserved=seatsReserved-1
                        setSeatsSelected(seatsSelected.filter(s=> s !==initialState[i][j].location))
                        setSeatsId(seatsId.filter( id => id !== initialState[i][j]._id))
                    }

                }else  continue
            }
        }
    }

    setSelected(initialState)
}

function seatsRowDivs(arr){

    let row = arr.map((ele, index)=>{
        
        if(index === 3 || index === 12){
            if(ele.hasOwnProperty('userId') && ele.userId!==userId){
            return <>
            <div className='blank'></div>
            <div className="seat seat--reserved">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="700pt" height="20pt" version="1.1" viewBox="0 0 700 700"><text>{ele.location}</text><g><path d="m576.48 195.15c-14.27 0-25.832 11.562-25.832 25.84v176.59c-1.5898 0.54688-3.1914 1.0039-4.7383 1.7539-0.45312 0.20703-24.719 11.816-63.875 22.656-12.465-8.7422-28.301-12.641-44.426-9.5195-59.242 11.492-116.73 11.637-175.9 0.36328-15.961-3.0078-31.617 0.81641-44 9.4062-39.027-10.824-63.203-22.477-63.918-22.824-1.4492-0.71875-2.9453-1.1484-4.4336-1.6641l0.003906-176.77c0-14.262-11.562-25.84-25.84-25.84-14.27 0-25.832 11.57-25.832 25.84v211c0 1.2422 0.19141 2.4141 0.35938 3.6055 0.53906 13.703 8.1523 26.723 21.301 33.258 2.2305 1.0977 32.363 15.836 80.457 28.918 8.0547 14.75 22.383 25.906 40.176 29.305 36.391 6.9141 72.918 10.434 108.61 10.434 36.52 0 73.922-3.668 111.16-10.887 17.602-3.3984 31.781-14.422 39.809-28.969 48.02-13.016 78.23-27.613 80.465-28.711 12.246-6.0078 19.824-17.617 21.309-30.219 0.58203-2.1562 1.0039-4.3906 1.0039-6.7305v-211c-0.003907-14.266-11.582-25.828-25.855-25.828zm-390.38 12.914-0.003907 162.91c5.1406 1.9883 11.391 4.3164 18.879 6.8047 20.031-10.148 43.449-13.598 65.832-9.3633 53.918 10.289 104.66 10.16 158.81-0.35156 22.598-4.3672 45.961-0.92578 66.047 9.1914 6.8867-2.3008 12.734-4.4414 17.645-6.3398l0.09375-162.86c0-29.109 21.559-53.059 49.52-57.266l0.003907-78.766c0-14.27-10.793-21-25.832-25.844 0 0-81.91-23.688-185.72-23.688-103.84 0-188.94 23.688-188.94 23.688-14.668 4.5586-25.84 11.562-25.84 25.844v78.77c27.945 4.2031 49.508 28.16 49.508 57.27z"/></g></svg>
                </div>
            </>} else {
                return <>
                <div className='blank'></div>
                <div value={ele._id} name={ele.location} onClick={e=>handleClick(e)} className="seat seat--enabled">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="700pt" height="20pt" version="1.1" viewBox="0 0 700 700"><text>{ele.location}</text><g><path d="m576.48 195.15c-14.27 0-25.832 11.562-25.832 25.84v176.59c-1.5898 0.54688-3.1914 1.0039-4.7383 1.7539-0.45312 0.20703-24.719 11.816-63.875 22.656-12.465-8.7422-28.301-12.641-44.426-9.5195-59.242 11.492-116.73 11.637-175.9 0.36328-15.961-3.0078-31.617 0.81641-44 9.4062-39.027-10.824-63.203-22.477-63.918-22.824-1.4492-0.71875-2.9453-1.1484-4.4336-1.6641l0.003906-176.77c0-14.262-11.562-25.84-25.84-25.84-14.27 0-25.832 11.57-25.832 25.84v211c0 1.2422 0.19141 2.4141 0.35938 3.6055 0.53906 13.703 8.1523 26.723 21.301 33.258 2.2305 1.0977 32.363 15.836 80.457 28.918 8.0547 14.75 22.383 25.906 40.176 29.305 36.391 6.9141 72.918 10.434 108.61 10.434 36.52 0 73.922-3.668 111.16-10.887 17.602-3.3984 31.781-14.422 39.809-28.969 48.02-13.016 78.23-27.613 80.465-28.711 12.246-6.0078 19.824-17.617 21.309-30.219 0.58203-2.1562 1.0039-4.3906 1.0039-6.7305v-211c-0.003907-14.266-11.582-25.828-25.855-25.828zm-390.38 12.914-0.003907 162.91c5.1406 1.9883 11.391 4.3164 18.879 6.8047 20.031-10.148 43.449-13.598 65.832-9.3633 53.918 10.289 104.66 10.16 158.81-0.35156 22.598-4.3672 45.961-0.92578 66.047 9.1914 6.8867-2.3008 12.734-4.4414 17.645-6.3398l0.09375-162.86c0-29.109 21.559-53.059 49.52-57.266l0.003907-78.766c0-14.27-10.793-21-25.832-25.844 0 0-81.91-23.688-185.72-23.688-103.84 0-188.94 23.688-188.94 23.688-14.668 4.5586-25.84 11.562-25.84 25.844v78.77c27.945 4.2031 49.508 28.16 49.508 57.27z"/></g></svg>
                </div>
                </>

            }

            //////// !userId
        } else if (ele.hasOwnProperty('userId') && ele.userId!==userId){

            return(
        
                <div className="seat seat--reserved">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="700pt" height="20pt" version="1.1" viewBox="0 0 700 700"><text>{ele.location}</text><g><path d="m576.48 195.15c-14.27 0-25.832 11.562-25.832 25.84v176.59c-1.5898 0.54688-3.1914 1.0039-4.7383 1.7539-0.45312 0.20703-24.719 11.816-63.875 22.656-12.465-8.7422-28.301-12.641-44.426-9.5195-59.242 11.492-116.73 11.637-175.9 0.36328-15.961-3.0078-31.617 0.81641-44 9.4062-39.027-10.824-63.203-22.477-63.918-22.824-1.4492-0.71875-2.9453-1.1484-4.4336-1.6641l0.003906-176.77c0-14.262-11.562-25.84-25.84-25.84-14.27 0-25.832 11.57-25.832 25.84v211c0 1.2422 0.19141 2.4141 0.35938 3.6055 0.53906 13.703 8.1523 26.723 21.301 33.258 2.2305 1.0977 32.363 15.836 80.457 28.918 8.0547 14.75 22.383 25.906 40.176 29.305 36.391 6.9141 72.918 10.434 108.61 10.434 36.52 0 73.922-3.668 111.16-10.887 17.602-3.3984 31.781-14.422 39.809-28.969 48.02-13.016 78.23-27.613 80.465-28.711 12.246-6.0078 19.824-17.617 21.309-30.219 0.58203-2.1562 1.0039-4.3906 1.0039-6.7305v-211c-0.003907-14.266-11.582-25.828-25.855-25.828zm-390.38 12.914-0.003907 162.91c5.1406 1.9883 11.391 4.3164 18.879 6.8047 20.031-10.148 43.449-13.598 65.832-9.3633 53.918 10.289 104.66 10.16 158.81-0.35156 22.598-4.3672 45.961-0.92578 66.047 9.1914 6.8867-2.3008 12.734-4.4414 17.645-6.3398l0.09375-162.86c0-29.109 21.559-53.059 49.52-57.266l0.003907-78.766c0-14.27-10.793-21-25.832-25.844 0 0-81.91-23.688-185.72-23.688-103.84 0-188.94 23.688-188.94 23.688-14.668 4.5586-25.84 11.562-25.84 25.844v78.77c27.945 4.2031 49.508 28.16 49.508 57.27z"/></g></svg>
                </div>
            )
        } 
        
        else{

            return(

                <div value={ele._id} name={ele.location} onClick={e=>handleClick(e)} className="seat seat--enabled">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="700pt" height="20pt" version="1.1" viewBox="0 0 700 700"><text>{ele.location}</text><g><path d="m576.48 195.15c-14.27 0-25.832 11.562-25.832 25.84v176.59c-1.5898 0.54688-3.1914 1.0039-4.7383 1.7539-0.45312 0.20703-24.719 11.816-63.875 22.656-12.465-8.7422-28.301-12.641-44.426-9.5195-59.242 11.492-116.73 11.637-175.9 0.36328-15.961-3.0078-31.617 0.81641-44 9.4062-39.027-10.824-63.203-22.477-63.918-22.824-1.4492-0.71875-2.9453-1.1484-4.4336-1.6641l0.003906-176.77c0-14.262-11.562-25.84-25.84-25.84-14.27 0-25.832 11.57-25.832 25.84v211c0 1.2422 0.19141 2.4141 0.35938 3.6055 0.53906 13.703 8.1523 26.723 21.301 33.258 2.2305 1.0977 32.363 15.836 80.457 28.918 8.0547 14.75 22.383 25.906 40.176 29.305 36.391 6.9141 72.918 10.434 108.61 10.434 36.52 0 73.922-3.668 111.16-10.887 17.602-3.3984 31.781-14.422 39.809-28.969 48.02-13.016 78.23-27.613 80.465-28.711 12.246-6.0078 19.824-17.617 21.309-30.219 0.58203-2.1562 1.0039-4.3906 1.0039-6.7305v-211c-0.003907-14.266-11.582-25.828-25.855-25.828zm-390.38 12.914-0.003907 162.91c5.1406 1.9883 11.391 4.3164 18.879 6.8047 20.031-10.148 43.449-13.598 65.832-9.3633 53.918 10.289 104.66 10.16 158.81-0.35156 22.598-4.3672 45.961-0.92578 66.047 9.1914 6.8867-2.3008 12.734-4.4414 17.645-6.3398l0.09375-162.86c0-29.109 21.559-53.059 49.52-57.266l0.003907-78.766c0-14.27-10.793-21-25.832-25.844 0 0-81.91-23.688-185.72-23.688-103.84 0-188.94 23.688-188.94 23.688-14.668 4.5586-25.84 11.562-25.84 25.844v78.77c27.945 4.2031 49.508 28.16 49.508 57.27z"/></g></svg>
                </div>
            )
        }
    })

    return row 
}
    return (
        <div className="container">
        <h1><span>'{reservation.movieTitle}'</span></h1>
        <div className='inRow'>
            <div className='movieDetail'>

                <div className='imgContainer'>
                    <img src={"https://image.tmdb.org/t/p/original" + reservation.image} className='img' alt='MovieImg'/>
                </div>

                <div className='descriptionContainer'>
                    <p><span className='spanTitle'>Date: </span>{new Date(reservation.dateTime)
                        .toLocaleString()
                        .replace(",", " -")
                        .substring(0, 18)}
                    Hs</p>

                    <p><span className='spanTitle'>Tickets: </span>{reservation.tickets}</p>

                    <p><span className='spanTitle'>Movie Theater: </span>{reservation.roomId}</p>  
                    <p><span className='spanTitle'>Format: </span>{reservation.format}</p>
                    <p><span className='spanTitle'>Your Seats Selection:</span>
                    <br />
                    <br />
                        {seatsSelected.length ? <span className='lastSpan'>{seatsSelected.join(' • ')}</span> : <p>No seats selected yet</p>}</p>
                </div>
            </div>

            <div className='seatPicker'>
                <h4>Screen</h4>  
                <div className="box">              

                    {selected.length ?
                    selected.map((r, index)=>
                    <div className="seat-picker__row">
                        <div className="seat-picker__row__leter">{rowNames[index]}</div>
                        {seatsRowDivs(r)}
                    </div>)
                    :
                    <div>No seats here</div>}

                    {selected.length ?

                    <div className='columnNumber'>
                        <div className='blank' style={{margin: '4px'}}></div> 
                        {selected[selected.length - 1].map((c, index)=>{
                            // style={{maxWidth: '30px', maxHeight:'30px', padding: c.location.slice(1).length < 2 ? '12px' : '8px', textAlign: 'center'}}
                            if(index === 3) 
                               { return <><div className='blank' style={{margin: '0 1.05rem'}}></div>
                                <div className='blank'>{c.location.slice(1)}</div></>}
                            if(index === 12){
                                return <><div className='blank' style={{margin: '0 .65rem'}}></div>
                                <div className='blank'>{c.location.slice(1)}</div></>
                                }
                             
                            // style={{maxWidth: '30px', maxHeight:'30px', padding: c.location.slice(1).length < 2 ? '12px' : '8px', textAlign: 'center'}}
                            else{ 
                                return <div className='blank' >{c.location.slice(1)}</div>
                            }
                        })}
                    </div>

                    : null
                    }

                </div>

        
            </div>

        </div>
            <button onClick={handleOnConfirmSeats} disabled={seatsReserved < tickets ? true : false}>Confirm selection</button>
        </div>
    );


}

