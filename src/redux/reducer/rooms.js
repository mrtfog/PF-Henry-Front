const initialState = {
    rooms: [],
};
  
export default function showtimesReducer(state = initialState, action) {
    
    switch (action.type) {
  
        case "GET_ROOMS":
            return {
                ...state,
                rooms: action.payload,
            };

       
        case 'POST_NEW_ROOM':
            
            return{
                ...state
            }
            
        case 'DELETE_ROOM':

            return{
                ...state
            }
        
        default:
            return {
                ...state,
            };
    }
}
  