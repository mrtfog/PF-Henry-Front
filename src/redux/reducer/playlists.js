const initialState = {

    playlists: [],
    selectedPlaylist: {},
    movies: [],
    formDisplay: 'none',
    selectedMovie: {}

}

export default function playlistReducer(state = initialState, action) {

    switch (action.type) {

        case 'GET_USER_PLAYLISTS':
            return {
                ...state,
                playlists: action.payload.length ? action.payload : []
            }

        case 'GET_PLAYLIST':

            return {
                ...state,
                selectedPlaylist: action.payload
            }

        case 'GET_PLAYLIST_MOVIES':
            return {
                ...state,
                movies: action.payload
            }

        case 'CREATE_NEW_PLAYLIST':
            return {
                ...state
            }

        case 'ADD_MOVIE_TO_PLAYLIST':
            return {
                ...state,
                selectedPlaylist: action.payload
            }

        case 'REMOVE_MOVIE_FROM_PLAYLIST':
            return {
                ...state,
                selectedPlaylist: action.payload.list,
                movies: state.movies.filter(m => m.id !== action.payload.movieId)
            }

        case 'ADD_TO_PLAYLIST_DISPLAY':
            return {
                ...state,
                formDisplay: action.payload
            }

        case 'SELECTED_MOVIE':
            return {
                ...state,
                selectedMovie: action.payload
            }

        case "CLEAR_SELECTED_PLAYLIST":

            return {
                ...state,
                selectedPlaylist: {},
                movies: []
            }

        default:
            return { ...state }

    }
}