const initialState = {

    playlists: [
        {
            _id: 'sdhskj',
            name: 'playlist 1', 
            userId:'user789', 
            contributors:[],
            movies:[459151, 769636, 948333]
            
        },
        {
            _id: 'sdhskj2',
            name: 'playlist 2', 
            userId: 'user867',
            contributors:[{id: 34, username:'Belen'}, {id: 35, username:'Sergio'}, {id: 36, username:'Belen2'}, {id: 37, username:'Martin'},{id: 38, username:'Angela'}, {id: 39, username:'Andres'}, {id: 40, userName:'Luciano'}],
            movies:[550, 945657, 592350]
        }
    ],

    selectedPlaylist: {},
    movies: [],
    formDisplay: 'none',
    selectedMovie: {}

}

export default function playlistReducer(state = initialState, action){

    switch(action.type){

        case 'GET_USER_PLAYLISTS':
            return{
                ...state
            }

        case 'GET_PLAYLIST':

            return{
                ...state,
                selectedPlaylist: state.playlists.filter(p => p._id === action.payload).shift()
            }

        case 'GET_PLAYLIST_MOVIES':
            return{
                ...state,
                movies: action.payload
            }

        case 'CLEAR_PLAYLIST_MOVIES':
            return{
                ...state,
                movies: {}
            }

        case 'ADD_TO_PLAYLIST_DISPLAY':
            return{
                ...state,
                formDisplay: action.payload
            }

        case 'SELECTED_MOVIE':
            return{
                ...state,
                selectedMovie: action.payload
            }

        default:
            return {...state}

    }
}