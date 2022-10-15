import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getReservations } from '../../redux/actions/cart'
import { getAllShowtimes } from '../../redux/actions/showtimes'
import { getAllRooms } from '../../redux/actions/rooms'
import { selectSeatsDisplay, selectedReservation } from '../../redux/actions/cart'
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

const NewCart = () => {

  const history = useHistory()
  const dispatch = useDispatch()
  const { currentUser } = useAuth()

  const reservations = useSelector(state => state.cartReducer.newReservations)
  const showtimes = useSelector(state => state.showtimesReducer.showtimes)
  const rooms = useSelector(state => state.roomReducer.rooms)

  useEffect(() => {
    dispatch(getReservations(currentUser.accessToken))
    dispatch(getAllShowtimes())
    dispatch(getAllRooms())
  }, [])

  function handleOnClick(r) {
    if (!currentUser) {
      Swal.fire({
        text: "To select your seats you need be logged in",
        icon: "info",
        iconColor: "#497aa6",
        showCloseButton: true,
        showDenyButton: true,
        denyButtonText: "Continue",
        confirmButtonText: "Log In",
        allowEnterKey: false,
        customClass: {
          popup: "Alert",
          closeButton: "closeButton",
          confirmButton: "confirmButton",
          denyButton: "denyButton",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          history.push(`/login`);
        }
      });
    }

    dispatch(selectSeatsDisplay("flex"));
    dispatch(selectedReservation(r));
  }



  const displayReservations = reservations.length ? reservations.map(r => {

    const reservShowtime = showtimes ? showtimes.find(s => s._id.toString() === r.showtimeId) : undefined
    const reservRoom = reservShowtime ? rooms.find(r => reservShowtime.roomId === r._id.toString()) : undefined

    if (reservShowtime && reservRoom) {
      return {
        reservationId: r._id.toString(),
        price: r.price,
        title: reservShowtime.movieTitle,
        image: reservShowtime.image,
        format: reservShowtime.format,
        dateTime: reservShowtime.dateTime,
        roomNumber: reservRoom.number || undefined,
        roomId: reservShowtime.roomId,
        showtimeId: r.showtimeId,
        ticketAmount: r.ticketAmount,
        seats: reservShowtime.seats,
        seatLocations: r.seatLocations
      }
    }

  }) : undefined


  console.log(displayReservations)

  return (
    <div>

      {
        displayReservations ? displayReservations.map(r => {

          if (r) {
            return (

              <div>
                <img src={"https://image.tmdb.org/t/p/original" + r.image} alt="" />
                <h1>{r.title}</h1>

                {r.seatLocations.join(" - ")}

                <p>{r.roomNumber}</p>
                <p>{r.format}</p>
                <p>{r.dateTime}</p>
                <p>{r.price}</p>

                <button disabled={currentUser ? false : true} onClick={() => { handleOnClick(r) }}>Choose Seat</button>
              </div>

            )
          }

        }) : <h1>You got nothing</h1>
      }


    </div>
  )
}

export default NewCart