import { startOfDay } from "date-fns";

const initialState = {
    newCart: [],
    displayCart: 'none',
    displaySeats: 'none',
    selectedReservation: {},
    takenTickets: {},
    showtime: [],
    allReservations: [],
    /* ===== ESTO LO HIZO EL INVESIL DE LUSIANO ===== */
    newReservations: [],
    /* ===== */
}



export default function showtimesReducer(state = initialState, action) {

    switch (action.type) {

        /* ===== ESTO LO HIZO EL INVESIL DE LUSIANO ===== */
        case "NEW_GET_RESERVATIONS":

            return {
                ...state,
                newReservations: action.payload
            }

        case "CLEAR_NEW_RESERVATIONS":
            return {
                ...state,
                newReservations: []
            }


        case "GET_ALL_RESERVATIONS":
        return {
            ...state,
            allReservations: action.payload,
        };

        case "ORDERED_BY":
        const { buttonName, orderType } = action.payload;
        let orderedReservations;

        if (buttonName === "amount" && orderType === true) {
            orderedReservations = state.allReservations.sort(function (a, b) {
            if (a.price > b.price) return -1;
            if (a.price < b.price) return 1;
            else return 0;
            });
        } else if (buttonName === "amount" && orderType === false) {
            orderedReservations = state.allReservations.sort(function (a, b) {
            if (a.price > b.price) return 1;
            if (a.price < b.price) return -1;
            else return 0;
            });
        }

        if (buttonName === "date" && orderType === true) {
            orderedReservations = state.allReservations.sort(function (a, b) {
            if (a.payedAt > b.payedAt) return -1;
            if (a.payedAt < b.payedAt) return 1;
            else return 0;
            });
        } else if (buttonName === "date" && orderType === false) {
            orderedReservations = state.allReservations.sort(function (a, b) {
            if (a.payedAt > b.payedAt) return 1;
            if (a.payedAt < b.payedAt) return -1;
            else return 0;
            });
        }

        if (buttonName === "type" && orderType === true) {
            orderedReservations = state.allReservations.sort(function (a, b) {
            if (a.type > b.type) return -1;
            if (a.type < b.type) return 1;
            else return 0;
            });
        } else if (buttonName === "type" && orderType === false) {
            orderedReservations = state.allReservations.sort(function (a, b) {
            if (a.type > b.type) return 1;
            if (a.type < b.type) return -1;
            else return 0;
            });
        }

        return {
            ...state,
            allReservations: orderedReservations,
        };

            /* ===== */


        
        
        
        
        
        
        
        case 'GET_CART':
            return {
                ...state,
                newCart: JSON.parse(sessionStorage.getItem('newCart')).length ? JSON.parse(sessionStorage.getItem('newCart')) : []
            };
        
        
        case 'ADD_TO_CART':

            sessionStorage.cart = JSON.stringify([...state.newCart, action.payload])
            return {
                ...state,
                newCart: [...state.newCart, action.payload]
            }
            
        case 'CLEAR_CART':
            return {
                ...state,
                newCart: []
            }
            
        case 'CLEAR_CART_BY_MOVIE':

            let deletedMovie = state.newCart.filter(m => {
                if (m.showtimeId !== action.payload) return m
            })
            return {
                ...state,
                newCart: deletedMovie
            }










        case 'TAKEN_TICKETS':

            return {
                ...state,
                takenTickets: action.payload
            };

        case 'SELECTED_RESERVATION':
            return {
                ...state,
                selectedReservation: action.payload
            }

        case "SELECTED_SEATS":
            return {
                ...state,
                newReservations: [...state.newReservations.filter(r => r._id.toString() !== action.payload._id.toString()), action.payload]
            }

        case  'DELETE_RESERVATION_BACK':

            return {
                ...state,
                newReservations: [...state.newReservations.filter(r => r._id.toString() !== action.payload.toString())]
            }

        case 'ADD_TO_CART_DISPLAY':

            return {
                ...state,
                displayCart: action.payload
            };

        case 'SELECT_SEATS_DISPLAY':

            return {
                ...state,
                displaySeats: action.payload
            }


        case 'GET_SHOWTIME_BY_MOVIE_ID':

            return {
                ...state,
                showtime: action.payload
            }


        case 'POST_RESERVATION':

            return {
                ...state
            }


        default:
            return {
                ...state,
            };
    }
}
