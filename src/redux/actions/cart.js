import axios from "axios";

export function getReservations(accessToken) {

    return async (dispatch) => {

        try {

            const { data } = await axios.get("https://pf-henry-back2.herokuapp.com/reservation/getByUser", { headers: { "user": accessToken } })
            return dispatch({ type: "NEW_GET_RESERVATIONS", payload: data })

        } catch (e) {
            console.log(e)
        }

    }
}




export function clearNewReservations(accessToken) {

    return async dispatch => {

        axios.put("https://pf-henry-back2.herokuapp.com/reservation/deleteByUser", {}, { headers: { "user": accessToken } })
        return dispatch({ type: "CLEAR_NEW_RESERVATIONS" })
    }

}


export function getAllReservations(currentUser) {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(
                "https://pf-henry-back2.herokuapp.com/reservation/getAll",
                { headers: { user: currentUser.accessToken } }
            );

            return dispatch({ type: "GET_ALL_RESERVATIONS", payload: data });
        } catch (e) {
            console.log(e);
        }
    };
}


export function orderedBy(buttonName, orderType) {
    return ({ type: 'ORDERED_BY', payload: { buttonName, orderType } });
}






















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
            let { data } = await axios.get(`https://pf-henry-back2.herokuapp.com/showtime/getByMovie/${id}`)

            return dispatch({ type: 'GET_SHOWTIME_BY_MOVIE_ID', payload: data })

        } catch (e) {
            console.log(e)
        }

    }

}





export function postCart(payload, accestoken) {

    return async (dispatch) => {

        try {

            const { data } = await axios.post('https://pf-henry-back2.herokuapp.com/reservation/post', payload, { headers: { 'user': accestoken } })
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


export function clearCart() {
    return { type: 'CLEAR_CART' }
}

export function clearCartByMovie(payload) {
    return { type: 'CLEAR_CART_BY_MOVIE', payload }
}





export function selectedSeats(accessToken, showtimeId, seatLocations) {
    return async (dispatch) => {

        try {

            const { data } = await axios.put('https://pf-henry-back2.herokuapp.com/reservation/setUserSeats', { showtimeId, seatLocations }, { headers: { "user": accessToken } })

            return dispatch({ type: 'SELECTED_SEATS', payload: data })

        } catch (e) {
            console.log(e)
        }
    }

}


export function deleteReservationBack(reservationId, accessToken) {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(
                "https://pf-henry-back2.herokuapp.com/reservation/cancelById", reservationId,
                { headers: { 'user': accessToken } }
            );

            return dispatch({ type: "DELETE_RESERVATION_BACK", payload: reservationId });
        } catch (e) {
            console.log(e);
        }
    };
}