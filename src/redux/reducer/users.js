const initialState = {
    users: [],
    selectedUser: [],
    userSession: []
};
  
export default function showtimesReducer(state = initialState, action) {
    
    switch (action.type) {
        case "GET_USER_BY_ID":
            return{
                ...state,
                selectedUser: action.payload
            }

        case "GET_USER_SESSION":
            return{
                ...state,
                userSession: action.payload
            }
            
        case "POST_NEW_USER":
            
            return {
                ...state,
            };
  
        default:
            return {
                ...state,
            };
    }
}
  