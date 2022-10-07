const initialState = {    
     cart : [
        {
            showtimeId: "633d84a8454ea464def96467",
            movieId: '550',
            tickets: '3',

        },
        {
            showtimeId: "633f208f2e588110d481ecd6",
            movieId: '616037',
            tickets: '1',

        }
    ],
    display: 'none',
    takenTickets: {},
    showtime: [],
}
  
export default function showtimesReducer(state = initialState, action) {
    
    switch (action.type) {
        
        case 'GET_CART':
            
            return {
                ...state,
            };
        case 'TAKEN_TICKETS':
            
            return {
                ...state,
                takenTickets: action.payload
            };
        case 'ADD_TO_CART_DISPLAY':
            
            return {
                ...state,
                display: action.payload
            };
        
        case 'GET_SHOWTIME_BY_MOVIE_ID':

        return{
            ...state,
            showtime: action.payload
        }
        default:
            return {
                ...state,
            };
    }
}
  