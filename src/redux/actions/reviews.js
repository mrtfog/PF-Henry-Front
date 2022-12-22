import axios from 'axios';

export function getMovieReviews(id) {

    return async (dispatch) => {

        try {

            const { data } = await axios.get(`https://moviefy-lphj.onrender.com/review/${id}`)

            return dispatch({ type: 'GET_MOVIE_REVIEWS', payload: data })
        }
        catch (e) {

            console.log(e)
        }

    }
}

export function postMovieReview(payload, currentUser) {

    return async (dispatch) => {

        try {
            const { data } = await axios.post('https://moviefy-lphj.onrender.com/review/post', payload, { headers: { 'user': currentUser.accessToken } })

            return dispatch({ type: 'POST_MOVIE_REVIEW', payload: data })
        }
        catch (e) {
            console.log(e)
        }
    }
}

export function postWebsiteReview(payload, currentUser) {

    return async (dispatch) => {

        try {
            const { data } = await axios.post('https://moviefy-lphj.onrender.com/review/postWebsite', payload, { headers: { 'user': currentUser.accessToken } })

            return dispatch({ type: 'POST_WEBSITE_REVIEW', payload: data })
        }
        catch (e) {
            console.log(e)
        }
    }
}

export function getWebsiteReviews() {

    return async (dispatch) => {

        try {

            const { data } = await axios.get(`https://moviefy-lphj.onrender.com/review/getAllWebsite`)

            return dispatch({ type: 'GET_WEBSITE_REVIEWS', payload: data })
        }
        catch (e) {

            console.log(e)
        }

    }
}

export function setFormDisplay(display) {

    return { type: 'SET_FORM_DISPLAY', payload: display }
}