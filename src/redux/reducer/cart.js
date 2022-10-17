import { startOfDay } from "date-fns";

const initialState = {
    cart: [],
    displayCart: 'none',
    displaySeats: 'none',
    selectedReservation: {},
    takenTickets: {},
    showtime: [],
    reservationBack: [],

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

        // case 'SELECTED_SEATS':

        //     const { seatsId, userId, showtimeId } = action.payload

        //     const reservation = state.cart.find((r) => {
        //         return showtimeId === r.showtimeId
        //     })

        //     reservation.seatsId = seatsId
        //     reservation.userId = userId

        //     return {
        //         ...state,
        //         cart: state.cart.map(r => {
        //             if (showtimeId === r.showtimeId) {
        //                 return reservation
        //             } else {
        //                 return r
        //             }
        //         })
        //     }

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

        case 'ADD_TO_CART':

            sessionStorage.cart = JSON.stringify([...state.cart, action.payload])
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }

        case 'CLEAR_CART':
            return {
                ...state,
                cart: []
            }

        case 'CLEAR_CART_BY_MOVIE':

            let deletedMovie = state.cart.filter(m => {
                if (m.showtimeId !== action.payload) return m
            })
            return {
                ...state,
                cart: deletedMovie
            }

        case 'POST_RESERVATION':

            return {
                ...state
            }


        case 'GET_RESERVATION_THROUGH_BACK':
            return {
                ...state,
                reservationBack: action.payload
            }

        case 'ADD_TO_CART_THROUGH_BACK':
            return {
                ...state,
                cart: [...state.cart, ...action.payload.filter(r => !state.cart.some(res => r.showtimeId === res.showtimeId))]
            }

        default:
            return {
                ...state,
            };
    }
}
