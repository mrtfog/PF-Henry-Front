import axios from "axios"

export function getGraphicReservations(currentUser) {

    return async dispatch => {

        try {

            const { data } = await axios.get("https://pf-henry-back.herokuapp.com/reservation/getAll", { headers: { "user": currentUser.accessToken } })
            return dispatch({ type: "GET_GRAPHIC_RESERVATIONS", payload: data })

        } catch (e) {
            console.log(e)
        }

    }

}

export function getGraphicSubscriptions(currentUser) {
    return async dispatch => {

        try {

            const { data } = await axios.get("https://pf-henry-back.herokuapp.com/subscription/getAll", { headers: { "user": currentUser.accessToken } })
            return dispatch({ type: "GET_GRAPHIC_SUBSCRIPTIONS", payload: data })

        } catch (e) {
            console.log(e)
        }

    }
}