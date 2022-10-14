import axios from "axios";
import { updateCurrentUser } from "firebase/auth";

export function getCart() {

    return async (dispatch) => {
        try {
            return dispatch({ type: "GET_CART" });
        }
        catch (e) {
            console.log(e);
        }
    };

}

export function getShowtimeByMovieId(id) {

    return async (dispatch) => {

        try {
            let { data } = await axios.get(`https://pf-henry-back.herokuapp.com/showtime/getByMovie/${id}`)

            return dispatch({ type: 'GET_SHOWTIME_BY_MOVIE_ID', payload: data })

        } catch (e) {
            console.log(e)
        }

    }

}

export function getReservationThroughBack(accestoken) {

    return async (dispatch) => {

        try {
            let { data } = await axios.get(`https://pf-henry-back.herokuapp.com/reservation/getByUser`, { headers: { 'user': accestoken } })
            
            return dispatch({ type: 'GET_RESERVATION_THROUGH_BACK', payload: data })

        } catch (e) {
            console.log(e)
        }

    }

}



export function postCart(payload, accestoken) {

    return async (dispatch) => {

        try {

            await axios.post('https://pf-henry-back.herokuapp.com/reservation/post', payload, { headers: { 'user': accestoken } })

            return dispatch({ type: 'POST_RESERVATION' })

        } catch (e) {
            console.log(e)
        }
    }


}



export function takenTickets(id, title) {

    return { type: 'TAKEN_TICKETS', payload: { id, title } }
}

export function selectedReservation(reservation) {

    return { type: 'SELECTED_RESERVATION', payload: reservation }
}


export function addToCartDisplay(display) {

    return { type: 'ADD_TO_CART_DISPLAY', payload: display }
}

export function selectSeatsDisplay(display) {

    return { type: 'SELECT_SEATS_DISPLAY', payload: display }
}

export function addToCart(payload) {
    return { type: 'ADD_TO_CART', payload }
}

export function addToCartThroughBack(payload) {
    return { type: 'ADD_TO_CART_THROUGH_BACK', payload }
}

export function selectedSeats(seatsId, userId, showtimeId) {
    return { type: 'SELECTED_SEATS', payload: { seatsId, userId, showtimeId } }
}

export function clearCart() {
    return { type: 'CLEAR_CART' }
}

export function clearCartByMovie(payload) {
    return { type: 'CLEAR_CART_BY_MOVIE', payload }
}






//future dispatch seats to back

// export function selectedSeats(seatsId, userId, showtimeId, reservationId) {
//     return async (dispatch) => {
        
//         try {
            
//             await axios.post('https://pf-henry-back.herokuapp.com/reservation/setUserSeats', {reservationId, seatsLocations: seatsId})
            
//             return dispatch({ type: 'SELECTED_SEATS', payload: { seatsId, userId, showtimeId } })
            
//         } catch (e) {
//             console.log(e)
//         }
//     }
   
// }