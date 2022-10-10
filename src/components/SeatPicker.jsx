import React, {useState} from 'react';
import img from '../assets/uncharted-poster.jpg'
import "../scss/components/_seatPicker.scss";
let seatsReserved= 0

export default function Seats({reservation}) {
    let tickets = reservation.tickets
    let userId = '2'
    const [seatsSelected, setSeatsSelected] = useState([])
    // let movieTheatre = [[]]

    let rowNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    const [selected, setSelected] = useState([
        [
        { showtimeId: '1', _id: '1', location: "A1" },
        { showtimeId: '1', _id: '2', location: "A2" },
        { showtimeId: '1', _id: '3', location: "A3" },
        null,
        { showtimeId: '1', _id: '4', location: "A4" },
        { showtimeId: '1', _id: '24', location: "A5" },
        { showtimeId: '1', _id: '34', location: "A6" },
        { showtimeId: '1', _id: '44', location: "A7" },
        { showtimeId: '1', _id: '54', location: "A8" },
        { showtimeId: '1', _id: '5', location: "A9" },
        { showtimeId: '1', _id: '6', location: "A10" },
        null,
        { showtimeId: '1', _id: '7', location: "A11" },
        { showtimeId: '1', _id: '8', location: "A12" },
        { showtimeId: '1', _id: '9', location: "A13", userId: '1' }
        ],
        [
        { showtimeId: '1', _id: '11', location: "B1" },
        { showtimeId: '1', _id: '12', location: "B2" },
        { showtimeId: '1', _id: '13', location: "B3", userId: '1' },
        null,
        { showtimeId: '1', _id: '14', location: "B4" },
        { showtimeId: '1', _id: '74', location: "B5" },
        { showtimeId: '1', _id: '84', location: "B6" },
        { showtimeId: '1', _id: '34', location: "B7" },
        { showtimeId: '1', _id: '94', location: "B8" },
        { showtimeId: '1', _id: '15', location: "B9" },
        { showtimeId: '1', _id: '16', location: "B10" },
        null,
        { showtimeId: '1', _id: '17', location: "B11" },
        { showtimeId: '1', _id: '18', location: "B12" },
        { showtimeId: '1', _id: '19', location: "B13" }
            ],
            [
            { showtimeId: '1', _id: '21', location: "C1" },
            { showtimeId: '1', _id: '22', location: "C2" },
            { showtimeId: '1', _id: '23', location: "C3" },
            null,
            { showtimeId: '1', _id: '24', location: "C4" },
            { showtimeId: '1', _id: '29', location: "C5" },
            { showtimeId: '1', _id: '20', location: "C6" },
            { showtimeId: '1', _id: '99', location: "C7" },
            { showtimeId: '1', _id: '98', location: "C8" },
            { showtimeId: '1', _id: '25', location: "C9" },
            { showtimeId: '1', _id: '26', location: "C10" },
            null,
            { showtimeId: '1', _id: '27', location: "C11", userId: '1' },
            { showtimeId: '1', _id: '28', location: "C12" },
            { showtimeId: '1', _id: '29', location: "C13" }
            ],
            [
            { showtimeId: '1', _id: '11', location: "D1" },
            { showtimeId: '1', _id: '12', location: "D2" },
            { showtimeId: '1', _id: '13', location: "D3", userId: '1' },
            null,
            { showtimeId: '1', _id: '14', location: "D4" },
            { showtimeId: '1', _id: '74', location: "D5" },
            { showtimeId: '1', _id: '84', location: "D6" },
            { showtimeId: '1', _id: '34', location: "D7" },
            { showtimeId: '1', _id: '94', location: "D8" },
            { showtimeId: '1', _id: '15', location: "D9" },
            { showtimeId: '1', _id: '16', location: "D10" },
            null,
            { showtimeId: '1', _id: '17', location: "D11" },
            { showtimeId: '1', _id: '18', location: "D12" },
            { showtimeId: '1', _id: '19', location: "D13" }
            ],
            [
            { showtimeId: '1', _id: '11', location: "E1" },
            { showtimeId: '1', _id: '12', location: "E2" },
            { showtimeId: '1', _id: '13', location: "E3" },
            null,
            { showtimeId: '1', _id: '14', location: "E4" },
            { showtimeId: '1', _id: '74', location: "E5" },
            { showtimeId: '1', _id: '84', location: "E6" },
            { showtimeId: '1', _id: '34', location: "E7" },
            { showtimeId: '1', _id: '94', location: "E8" },
            { showtimeId: '1', _id: '15', location: "E9" },
            { showtimeId: '1', _id: '16', location: "E10" },
            null,
            { showtimeId: '1', _id: '17', location: "E11" },
            { showtimeId: '1', _id: '18', location: "E12" },
            { showtimeId: '1', _id: '19', location: "E13" }
            ],
            [
            { showtimeId: '1', _id: '11', location: "F1" },
            { showtimeId: '1', _id: '12', location: "F2" },
            { showtimeId: '1', _id: '13', location: "F3" },
            null,
            { showtimeId: '1', _id: '14', location: "F4" },
            { showtimeId: '1', _id: '74', location: "F5" },
            { showtimeId: '1', _id: '84', location: "F6" },
            { showtimeId: '1', _id: '34', location: "F7" },
            { showtimeId: '1', _id: '94', location: "F8" },
            { showtimeId: '1', _id: '15', location: "F9" },
            { showtimeId: '1', _id: '16', location: "F10" },
            null,
            { showtimeId: '1', _id: '17', location: "F11" },
            { showtimeId: '1', _id: '18', location: "F12" },
            { showtimeId: '1', _id: '19', location: "F13" }
            ],
            [
            { showtimeId: '1', _id: '11', location: "G1" },
            { showtimeId: '1', _id: '12', location: "G2" },
            { showtimeId: '1', _id: '13', location: "G3" },
            null,
            { showtimeId: '1', _id: '14', location: "G4" },
            { showtimeId: '1', _id: '74', location: "G5" },
            { showtimeId: '1', _id: '84', location: "G6" },
            { showtimeId: '1', _id: '34', location: "G7", userId: '1' },
            { showtimeId: '1', _id: '94', location: "G8" },
            { showtimeId: '1', _id: '15', location: "G9" },
            { showtimeId: '1', _id: '16', location: "G10" },
            null,
            { showtimeId: '1', _id: '17', location: "G11" },
            { showtimeId: '1', _id: '18', location: "G12" },
            { showtimeId: '1', _id: '19', location: "G13" }
            ]
        ]
    );

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
                            setSeatsSelected(seatsSelected.filter(s=> s!==initialState[i][j].location))
                        }

                    }else  continue
                }
            }
        }

        setSelected(initialState)
    }

    function seatsRowDivs(arr){

        let row = arr.map(ele=>{
            
            if(ele === null){

                return <div className='blank'></div>

            } 
            
            else if (ele.hasOwnProperty('userId') && ele.userId!==userId){

                return(
            
                    <div className="seat seat--reserved">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700"><text>{ele.location}</text><g><path d="m576.48 195.15c-14.27 0-25.832 11.562-25.832 25.84v176.59c-1.5898 0.54688-3.1914 1.0039-4.7383 1.7539-0.45312 0.20703-24.719 11.816-63.875 22.656-12.465-8.7422-28.301-12.641-44.426-9.5195-59.242 11.492-116.73 11.637-175.9 0.36328-15.961-3.0078-31.617 0.81641-44 9.4062-39.027-10.824-63.203-22.477-63.918-22.824-1.4492-0.71875-2.9453-1.1484-4.4336-1.6641l0.003906-176.77c0-14.262-11.562-25.84-25.84-25.84-14.27 0-25.832 11.57-25.832 25.84v211c0 1.2422 0.19141 2.4141 0.35938 3.6055 0.53906 13.703 8.1523 26.723 21.301 33.258 2.2305 1.0977 32.363 15.836 80.457 28.918 8.0547 14.75 22.383 25.906 40.176 29.305 36.391 6.9141 72.918 10.434 108.61 10.434 36.52 0 73.922-3.668 111.16-10.887 17.602-3.3984 31.781-14.422 39.809-28.969 48.02-13.016 78.23-27.613 80.465-28.711 12.246-6.0078 19.824-17.617 21.309-30.219 0.58203-2.1562 1.0039-4.3906 1.0039-6.7305v-211c-0.003907-14.266-11.582-25.828-25.855-25.828zm-390.38 12.914-0.003907 162.91c5.1406 1.9883 11.391 4.3164 18.879 6.8047 20.031-10.148 43.449-13.598 65.832-9.3633 53.918 10.289 104.66 10.16 158.81-0.35156 22.598-4.3672 45.961-0.92578 66.047 9.1914 6.8867-2.3008 12.734-4.4414 17.645-6.3398l0.09375-162.86c0-29.109 21.559-53.059 49.52-57.266l0.003907-78.766c0-14.27-10.793-21-25.832-25.844 0 0-81.91-23.688-185.72-23.688-103.84 0-188.94 23.688-188.94 23.688-14.668 4.5586-25.84 11.562-25.84 25.844v78.77c27.945 4.2031 49.508 28.16 49.508 57.27z"/></g></svg>
                    </div>
                )
            } 
            
            else{

                return(

                    <div value={ele._id} name={ele.location} onClick={e=>handleClick(e)} className="seat seat--enabled">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="700pt" height="700pt" version="1.1" viewBox="0 0 700 700"><text>{ele.location}</text><g><path d="m576.48 195.15c-14.27 0-25.832 11.562-25.832 25.84v176.59c-1.5898 0.54688-3.1914 1.0039-4.7383 1.7539-0.45312 0.20703-24.719 11.816-63.875 22.656-12.465-8.7422-28.301-12.641-44.426-9.5195-59.242 11.492-116.73 11.637-175.9 0.36328-15.961-3.0078-31.617 0.81641-44 9.4062-39.027-10.824-63.203-22.477-63.918-22.824-1.4492-0.71875-2.9453-1.1484-4.4336-1.6641l0.003906-176.77c0-14.262-11.562-25.84-25.84-25.84-14.27 0-25.832 11.57-25.832 25.84v211c0 1.2422 0.19141 2.4141 0.35938 3.6055 0.53906 13.703 8.1523 26.723 21.301 33.258 2.2305 1.0977 32.363 15.836 80.457 28.918 8.0547 14.75 22.383 25.906 40.176 29.305 36.391 6.9141 72.918 10.434 108.61 10.434 36.52 0 73.922-3.668 111.16-10.887 17.602-3.3984 31.781-14.422 39.809-28.969 48.02-13.016 78.23-27.613 80.465-28.711 12.246-6.0078 19.824-17.617 21.309-30.219 0.58203-2.1562 1.0039-4.3906 1.0039-6.7305v-211c-0.003907-14.266-11.582-25.828-25.855-25.828zm-390.38 12.914-0.003907 162.91c5.1406 1.9883 11.391 4.3164 18.879 6.8047 20.031-10.148 43.449-13.598 65.832-9.3633 53.918 10.289 104.66 10.16 158.81-0.35156 22.598-4.3672 45.961-0.92578 66.047 9.1914 6.8867-2.3008 12.734-4.4414 17.645-6.3398l0.09375-162.86c0-29.109 21.559-53.059 49.52-57.266l0.003907-78.766c0-14.27-10.793-21-25.832-25.844 0 0-81.91-23.688-185.72-23.688-103.84 0-188.94 23.688-188.94 23.688-14.668 4.5586-25.84 11.562-25.84 25.844v78.77c27.945 4.2031 49.508 28.16 49.508 57.27z"/></g></svg>
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
                        {seatsSelected.length? <span className='lastSpan'>{seatsSelected.join(' • ')}</span> : <p>No seats selected yet</p>}</p>
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
                        <span className='blank' style={{margin: '0.5rem'}}></span>
                        {selected[selected.length - 1].map(c=>{
                            
                            if(c === null) return <span className='blank' style={{margin: '0.8rem'}}></span>
                            else{ 
                                return <span style={{maxWidth: '30px', maxHeight:'30px', padding: c.location.slice(1).length < 2 ? '12px' : '8px', textAlign: 'center'}}>{c.location.slice(1)}</span>
                            }
                        })}
                    </div>

                    : null
                    }

                </div>

        
            </div>

        </div>
            <button>Confirm selection</button>
        </div>
    );


}

