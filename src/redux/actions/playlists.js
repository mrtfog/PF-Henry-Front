
import axios from "axios";

export function getUserPlaylists(currentUser) {

    return async (dispatch) => {

        try {

            let { data } = await axios.get(`https://pf-henry-back.herokuapp.com/list/getByUser`, { headers: { 'user': currentUser.accessToken } })
            return dispatch({ type: 'GET_USER_PLAYLISTS', payload: data })
        }

        catch (e) {
            console.log(e)
        }

    }
}

export function getPlaylist(id, currentUser) {

    return async (dispatch) => {

        try {

            let { data } = await axios.get(`https://pf-henry-back.herokuapp.com/list/getByUser`, { headers: { 'user': currentUser.accessToken } })

            const playlist = data.filter(p => p._id.toString() === id)
            return dispatch({ type: 'GET_PLAYLIST', payload: playlist[0] })
        }

        catch (e) {
            console.log(e)
        }

    }

}

export function getPlaylistMovies(movies) {

    return async (dispatch) => {

        try {
            if (movies.length) {
                const promises = movies.map(async (id) => {

                    let { data } = await axios.get(`https://pf-henry-back.herokuapp.com/api/${id}`)
                    return data
                })
                let promiseAll = await Promise.all(promises)
                return dispatch({ type: 'GET_PLAYLIST_MOVIES', payload: promiseAll })
            }
        }

        catch (e) {

            console.log(e)
        }

    }
}

export function createNewPlaylist(playlist, currentUser) {

    return async (dispatch) => {

        try {

            await axios.post('https://pf-henry-back.herokuapp.com/list/post', playlist, { headers: { 'user': currentUser.accessToken } })

            return dispatch({ type: 'CREATE_NEW_PLAYLIST' })

        }
        catch (e) {

            console.log(e)

        }
    }
}

export function addMovieToPlaylist(movieId, playlistId, currentUser) {

    return async (dispatch) => {

        try {

            if (movieId && playlistId && currentUser) {
                const { data } = await axios.put(`https://pf-henry-back.herokuapp.com/list/addMovie/${playlistId}/${movieId}`, {}, { headers: { 'user': currentUser.accessToken } })
                return dispatch({ type: 'ADD_MOVIE_TO_PLAYLIST', payload: data })
            }

        }
        catch (e) {

            console.log(e)

        }
    }
}

export function removeMovieFromPlaylist(movieId, playlistId, currentUser) {

    return async (dispatch) => {

        try {

            const { data } = await axios.put(`https://pf-henry-back.herokuapp.com/list/removeMovie/${playlistId}/${movieId}`, {}, { headers: { 'user': currentUser.accessToken } })
            return dispatch({ type: 'REMOVE_MOVIE_FROM_PLAYLIST', payload: { list: data, movieId } })

        }
        catch (e) {

            console.log(e)

        }
    }
}

export function clearPlaylistMovies() {

    return { type: 'CLEAR_PLAYLIST_MOVIES' }
}

export function addToPlaylistDisplay(display) {

    return { type: 'ADD_TO_PLAYLIST_DISPLAY', payload: display }
}

export function selectedMovie(id, title) {

    return { type: 'SELECTED_MOVIE', payload: { id, title } }
}

export function clearSelectedPlaylist() {
    return {type:"CLEAR_SELECTED_PLAYLIST"}
}