import React, {useState} from 'react';
//import SeatPicker from "react-seat-picker";
import "../scss/components/_seatPicker.scss";

export default function Seats() {
  const [selected, setSelected] = useState([]);
    const rows = [
        [
          { showtimeId: '1', _id: '1', location: "A1" },
          { showtimeId: '1', _id: '2', location: "A2" },
          { showtimeId: '1', _id: '3', location: "A3" },
          { showtimeId: '1', _id: '4', location: "A4" },
          { showtimeId: '1', _id: '24', location: "A5" },
          { showtimeId: '1', _id: '34', location: "A6" },
          { showtimeId: '1', _id: '44', location: "A7" },
          { showtimeId: '1', _id: '54', location: "A8" },
          null,
          { showtimeId: '1', _id: '5', location: "A9" },
          { showtimeId: '1', _id: '6', location: "A10" },
          { showtimeId: '1', _id: '7', location: "A11" },
          { showtimeId: '1', _id: '8', location: "A12" },
          { showtimeId: '1', _id: '9', location: "A13", userId: '1' }
        ],
        [
          { showtimeId: '1', _id: '11', location: "B1" },
          { showtimeId: '1', _id: '12', location: "B2" },
          { showtimeId: '1', _id: '13', location: "B3", userId: '1' },
          { showtimeId: '1', _id: '14', location: "B4" },
          { showtimeId: '1', _id: '74', location: "B5" },
          { showtimeId: '1', _id: '84', location: "B6" },
          { showtimeId: '1', _id: '34', location: "B7" },
          { showtimeId: '1', _id: '94', location: "B8" },
          null,
          { showtimeId: '1', _id: '15', location: "B9" },
          { showtimeId: '1', _id: '16', location: "B10" },
          { showtimeId: '1', _id: '17', location: "B11" },
          { showtimeId: '1', _id: '18', location: "B12" },
          { showtimeId: '1', _id: '19', location: "B13" }
        ],
        [
          { showtimeId: '1', _id: '21', location: "C1" },
          { showtimeId: '1', _id: '22', location: "C2" },
          { showtimeId: '1', _id: '23', location: "C3" },
          { showtimeId: '1', _id: '24', location: "C4" },
          { showtimeId: '1', _id: '29', location: "C5" },
          { showtimeId: '1', _id: '20', location: "C6" },
          { showtimeId: '1', _id: '99', location: "C7" },
          { showtimeId: '1', _id: '98', location: "C8" },
          null,
          { showtimeId: '1', _id: '25', location: "C9" },
          { showtimeId: '1', _id: '26', location: "C10" },
          { showtimeId: '1', _id: '27', location: "C11", userId: '1' },
          { showtimeId: '1', _id: '28', location: "C12" },
          { showtimeId: '1', _id: '29', location: "C13" }
        ],
        [
          { showtimeId: '1', _id: '11', location: "D1" },
          { showtimeId: '1', _id: '12', location: "D2" },
          { showtimeId: '1', _id: '13', location: "D3", userId: '1' },
          { showtimeId: '1', _id: '14', location: "D4" },
          { showtimeId: '1', _id: '74', location: "D5" },
          { showtimeId: '1', _id: '84', location: "D6" },
          { showtimeId: '1', _id: '34', location: "D7" },
          { showtimeId: '1', _id: '94', location: "D8" },
          null,
          { showtimeId: '1', _id: '15', location: "D9" },
          { showtimeId: '1', _id: '16', location: "D10" },
          { showtimeId: '1', _id: '17', location: "D11" },
          { showtimeId: '1', _id: '18', location: "D12" },
          { showtimeId: '1', _id: '19', location: "D13" }
        ],
        [
          { showtimeId: '1', _id: '11', location: "E1" },
          { showtimeId: '1', _id: '12', location: "E2" },
          { showtimeId: '1', _id: '13', location: "E3" },
          { showtimeId: '1', _id: '14', location: "E4" },
          { showtimeId: '1', _id: '74', location: "E5" },
          { showtimeId: '1', _id: '84', location: "E6" },
          { showtimeId: '1', _id: '34', location: "E7" },
          { showtimeId: '1', _id: '94', location: "E8" },
          null,
          { showtimeId: '1', _id: '15', location: "E9" },
          { showtimeId: '1', _id: '16', location: "E10" },
          { showtimeId: '1', _id: '17', location: "E11" },
          { showtimeId: '1', _id: '18', location: "E12" },
          { showtimeId: '1', _id: '19', location: "E13" }
        ],
        [
          { showtimeId: '1', _id: '11', location: "F1" },
          { showtimeId: '1', _id: '12', location: "F2" },
          { showtimeId: '1', _id: '13', location: "F3" },
          { showtimeId: '1', _id: '14', location: "F4" },
          { showtimeId: '1', _id: '74', location: "F5" },
          { showtimeId: '1', _id: '84', location: "F6" },
          { showtimeId: '1', _id: '34', location: "F7" },
          { showtimeId: '1', _id: '94', location: "F8" },
          null,
          { showtimeId: '1', _id: '15', location: "F9" },
          { showtimeId: '1', _id: '16', location: "F10" },
          { showtimeId: '1', _id: '17', location: "F11" },
          { showtimeId: '1', _id: '18', location: "F12" },
          { showtimeId: '1', _id: '19', location: "F13" }
        ],
        [
          { showtimeId: '1', _id: '11', location: "G1" },
          { showtimeId: '1', _id: '12', location: "G2" },
          { showtimeId: '1', _id: '13', location: "G3" },
          { showtimeId: '1', _id: '14', location: "G4" },
          { showtimeId: '1', _id: '74', location: "G5" },
          { showtimeId: '1', _id: '84', location: "G6" },
          { showtimeId: '1', _id: '34', location: "G7", userId: '1' },
          { showtimeId: '1', _id: '94', location: "G8" },
          null,
          { showtimeId: '1', _id: '15', location: "G9" },
          { showtimeId: '1', _id: '16', location: "G10" },
          { showtimeId: '1', _id: '17', location: "G11" },
          { showtimeId: '1', _id: '18', location: "G12" },
          { showtimeId: '1', _id: '19', location: "G13" }
        ]
      ];

function handleClick(e){
  
  e.target.className === "seat seat--enabled"
  ?e.target.className = "seat seat--selected"
  :e.target.className = "seat seat--enabled"
  
}

function seatsRowDivs(arr){
   let row = arr.map(ele=>{if(ele === null){

      return <div className='blank'></div>

    } else if (ele.hasOwnProperty('userId')){
  
      return <div className="seat seat--reserved">
              {ele.location}
             </div>
    } else{
      return <div value={ele._id} name={ele.location} onClick={e=>handleClick(e)} className="seat seat--enabled">
              {ele.location}
             </div>
    }
  }
)
return row 
}

  

  return (
    <div className="container">
      <h1>Pick your Seat/s</h1>
      <h4>Screen</h4>
      <div className="box">
      {rows.length?
      rows.map((r, index)=>
      <div className="seat-picker__row">
        <div class="seat-picker__row__leter">{index+1}</div>
        {seatsRowDivs(r)}</div>):<div>No seats here</div>}
      </div>
    </div>
  );
}

