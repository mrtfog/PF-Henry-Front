import axios from 'axios';

export function getUserById(id) {

    return async (dispatch) => {
        try {
            const { data } = await axios.get(`https://moviefy-lphj.onrender.com/auth/${id}`);
            return dispatch({ type: "GET_USER_BY_ID", payload: data });
        }

        catch (e) {
            console.log(e);
        }
    };
}

export function getUserSession(id) {

    return async (dispatch) => {
        try {
            const { data } = await axios.get(`https://moviefy-lphj.onrender.com/auth/success`);
            return dispatch({ type: "GET_USER_SESSION", payload: data });
        }
        catch (e) {
            console.log(e);
        }
    };
}

export function postLogIn(payload) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`https://moviefy-lphj.onrender.com/auth/login`, payload);
            return dispatch({ type: "POST_LOG_IN", payload: response });
        }
        catch (e) {
            console.log(e);
        }
    };
}

export function postNewUser(payload) {

    return async (dispatch) => {

        try {
            const response = await axios.post('https://moviefy-lphj.onrender.com/auth/register', payload, { withCredentials: true })
            return dispatch({ type: 'POST_NEW_USER', payload: response.status })
        }
        catch (e) {
            alert(e.response.data)
        }

    }

}

export function clearRegisterStatus() {
    return (dispatch) => {
        return dispatch({ type: 'CLEAR_REGISTER_STATUS' })
    }
}

export function getUserPayments(currentUser) {

    return async (dispatch) => {

        try {

            const { data } = await axios.get('https://moviefy-lphj.onrender.com/reservation/getPayedByUser', { headers: { 'user': currentUser.accessToken } })

            return dispatch({ type: 'GET_USER_PAYMENTS', payload: data })
        }
        catch (e) {
            console.log(e)
        }
    }
}

export function getUserRole(accessToken) {

    return async (dispatch) => {

        try {

            const { data } = await axios.get("https://moviefy-lphj.onrender.com/user/role", { headers: { "user": accessToken } })
            return dispatch({ type: "GET_USER_ROLE", payload: data })

        } catch (e) {
            console.log(e)
        }

    }

}

export function clearUserRole() {
    return async dispatch => {

        try {
            return dispatch({ type: "CLEAR_USER_ROLE" })
        } catch (e) {
            console.log(e)
        }

    }
}

export function getUserSubscription(currentUser) {

    return async (dispatch) => {

        try {
            const { data } = await axios.get("https://moviefy-lphj.onrender.com/subscription/getByUser", { headers: { 'user': currentUser.accessToken } })
            return dispatch({ type: "GET_USER_SUBSCRIPTION", payload: data })

        } catch (e) {

            if (e.response.data === "Error: This user is not subscribed!") {
                return dispatch({ type: "GET_USER_SUBSCRIPTION", payload: {} })
            }

            console.log(e)
        }

    }
}

export function cancelUserPayment(currentUser) {

    return async (dispatch) => {

        try {
            await axios.delete("https://moviefy-lphj.onrender.com/subscription/cancelPayment", { headers: { 'user': currentUser.accessToken } })
            return dispatch({ type: "CANCEL_USER_SUBSCRIPTION", payload: {} })
        } catch (e) {
            console.log(e)
        }

    }

}