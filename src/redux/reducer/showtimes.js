const initialState = {

    showtimes: []

};
  
export default function showtimesReducer(state = initialState, action) {
    
    switch (action.type) {
  
        case "GET_FUNCTIONS":
            return {
                ...state,
                showtimes: action.payload,
            };
  
        case 'POST_FUNCTION':
            
            return{
                ...state
            }

        default:
            return {
                ...state,
            };
    }
}
  