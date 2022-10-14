import { startOfDay } from "date-fns";

const initialState = {    
    cart : [],
    displayCart: 'none',
    displaySeats: 'none',
    selectedReservation: {},
    takenTickets: {},
    showtime: [],
    reservationBack: []
}
  
export default function showtimesReducer(state = initialState, action) {
    
    switch (action.type) {
        
        case 'GET_CART':
            
            return {
                ...state,
                cart: JSON.parse(sessionStorage.getItem('cart')).length ? JSON.parse(sessionStorage.getItem('cart')) : []
            };

        case 'TAKEN_TICKETS':
            
            return {
                ...state,
                takenTickets: action.payload
            };

        case 'SELECTED_RESERVATION':
            return{
                ...state,
                selectedReservation: action.payload
            }    
            
        case 'SELECTED_SEATS':

            const {seatsId, userId, showtimeId} = action.payload 

            const reservation = state.cart.find((r) => {
                return showtimeId === r.showtimeId
            })

            reservation.seatsId = seatsId
            reservation.userId = userId

            return{
                ...state,
                cart : state.cart.map( r => {
                    if(showtimeId === r.showtimeId){
                        return reservation
                    } else {
                        return r
                    }
                })
            }

        case 'ADD_TO_CART_DISPLAY':
            
            return {
                ...state,
                displayCart: action.payload
            };

        case 'SELECT_SEATS_DISPLAY':

            return{
                ...state,
                displaySeats: action.payload
            }


        case 'GET_SHOWTIME_BY_MOVIE_ID':
            
            return{
                ...state,
                showtime: action.payload
            }

        case 'ADD_TO_CART':

            sessionStorage.cart= JSON.stringify([...state.cart, action.payload])
        
            return{
                ...state,
                cart: [...state.cart, action.payload]
            }

        case 'CLEAR_CART':
            return{
                ...state,
                cart: []
            }
            
        case 'CLEAR_CART_BY_MOVIE':

            let deletedMovie = state.cart.filter( m => {
                if(m.showtimeId !== action.payload) return m
            })
            return{
                ...state,
                cart: deletedMovie
            }

        case 'POST_RESERVATION':
            
            return{
                ...state
            }


        case 'GET_RESERVATION_THROUGH_BACK':
            return {
                ...state,
                reservationBack: action.payload
            }

        case 'ADD_TO_CART_THROUGH_BACK':
            return{
                ...state,
                cart:  [...state.cart, ...action.payload]
            }

        default:
            return {
                ...state,
            };
    }
}
  