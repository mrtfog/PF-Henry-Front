const initialState = {

    showtimes: []

};
  
export default function showtimesReducer(state = initialState, action) {
    
    switch (action.type) {
  
        case "GET_SHOWTIMES":
            return {
                ...state,
                showtimes: action.payload,
            };
  
        case 'POST_SHOWTIME':
            
            return{
                ...state
            }
        
        case 'UPDATE_SHOWTIME':
        
            return{
                ...state
            }

        case 'DELETE_SHOWTIME':
        
            return{
                ...state
            }

        default:
            return {
                ...state,
            };
    }
}
  