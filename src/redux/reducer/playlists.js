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
                selectedPlaylist: state.playlists.filter(p => p._id === action.payload).shift()
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
                ...state
            }

        case 'REMOVE_MOVIE_FROM_PLAYLIST':
            return {
                ...state
            }

        case 'CLEAR_PLAYLIST_MOVIES':
            return {
                ...state,
                movies: {}
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

        default:
            return { ...state }

    }
}