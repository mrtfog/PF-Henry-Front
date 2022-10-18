const initialState = {
    users: [],
    selectedUser: [],
    userSession: [],
    registerStatus:undefined,
    userPayments: [],
    userRole: undefined
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
            
        case "POST_LOG_IN":
            return {
                ...state,
                userSession: action.payload,
            }
            
        case "POST_NEW_USER":

            return {
                ...state,
                registerStatus: action.payload,
            };

        case 'CLEAR_REGISTER_STATUS':
            return {
                ...state,
                registerStatus: undefined,
            }

        case 'GET_USER_PAYMENTS':
            return{
                ...state,
                userPayments: action.payload
            }

            case "GET_USER_ROLE":
                return {
                    ...state,
                    userRole: action.payload
                }
  
        default:
            return {
                ...state,
            };
    }
}
  