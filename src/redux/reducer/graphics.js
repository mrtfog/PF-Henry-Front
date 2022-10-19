
const initialState = {
    graphicReservations: [],
    graphicSubscriptions: []
};

export default function graphicReducer(state = initialState, action) {

    switch (action.type) {

        case "GET_GRAPHIC_RESERVATIONS":
            return {
                ...state,
                graphicReservations: action.payload
            }

        case "GET_GRAPHIC_SUBSCRIPTIONS":
            return {
                ...state,
                graphicSubscriptions: action.payload
            }

        default:
            return {
                ...state,
            };
    }
}


