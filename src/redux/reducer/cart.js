const initialState = {    
    cart : [],
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

        case 'ADD_TO_CART':

        return{
            ...state,
            cart: [...state.cart, action.payload]
        }

        case 'POST_RESERVATION':
            return{
                ...state
            }


        default:
            return {
                ...state,
            };
    }
}
  