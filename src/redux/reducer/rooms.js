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
                ...state,
                rooms: [...state.rooms, action.payload]
            }
            
        case 'DELETE_ROOM':
            return{
                ...state,
                rooms: state.rooms.filter(room=> room._id.toString() !== action.payload)
            }
            
        default:
            return {
                ...state,
            };
    }
}
  