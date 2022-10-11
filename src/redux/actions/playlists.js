import axios from "axios";

// export function getUserPlaylists(){

//     return {type:'GET_USER_PLAYLISTS'}
// }

export function getUserPlaylists(userUid) {
    return async (dispatch) => {

        try {

            let { data } = await axios.get(`https://pf-henry-back.herokuapp.com/list/getByUser/${userUid}`, { headers: { 'user': userUid } })
            return dispatch({ type: 'GET_USER_PLAYLISTS', payload: data })
        }

        catch (e) {
            console.log(e)
        }

    }
}

export function getPlaylist(id) {

    return { type: 'GET_PLAYLIST', payload: id }
}

export function getPlaylistMovies(movies) {

    return async (dispatch) => {

        try {
            if (movies) {
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

export function createNewPlaylist(playlist) {

    return async (dispatch) => {

        try {

            await axios.post('https://pf-henry-back.herokuapp.com/list/post', playlist, { headers: { 'user': playlist.userId } })

            return dispatch({ type: 'CREATE_NEW_PLAYLIST' })

        }
        catch (e) {

            console.log(e)

        }
    }
}

export function addMovieToPlaylist(movieId, playlistId, userUid) {

    return async (dispatch) => {

        try {

            if (movieId && playlistId && userUid) await axios.put(`https://pf-henry-back.herokuapp.com/list/addMovie/${playlistId}/${movieId}`, {}, { headers: { 'user': userUid } })

            return dispatch({ type: 'ADD_MOVIE_TO_PLAYLIST' })

        }
        catch (e) {

            console.log(e)

        }
    }
}

export function removeMovieFromPlaylist(movieId, playlistId, userUid) {

    return async (dispatch) => {

        try {

            await axios.put(`https://pf-henry-back.herokuapp.com/list/removeMovie/${playlistId}/${movieId}`, {}, { headers: { 'user': userUid } })

            return dispatch({ type: 'REMOVE_MOVIE_FROM_PLAYLIST' })

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