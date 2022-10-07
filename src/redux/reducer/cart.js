const initialState = {    
     cart : [
        {
            showtimeId: "633d84a8454ea464def96467",
            movieId: '550',
            tickets: '3',
            room: '1',
            format: '2D',
            dateTime: '2022-10-06T13:19:10.000Z',
            poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg"
        },
        {
            showtimeId: "633f208f2e588110d481ecd6",
            movieId: '616037',
            tickets: '5',
            room: '3',
            format: '3D',
            dateTime: '2022-10-09T13:19:10.000Z',
            poster_path: "/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg"
        },
        {
            showtimeId: "633f93177775cfc170bdea81",
            movieId: '760161',
            tickets: '2',
            room: '2',
            format: '3D',
            dateTime: '2022-10-11T13:19:10.000Z',
            poster_path: "/wSqAXL1EHVJ3MOnJzMhUngc8gFs.jpg"
        }
    ],
    display: 'none',
    takenTickets: {},
    showtime: [],
}
  
export default function showtimesReducer(state = initialState, action) {
    
    switch (action.type) {
        
        case 'GET_CART':
            
            return {
                ...state,
            };
        case 'TAKEN_TICKETS':
            
            return {
                ...state,
                takenTickets: action.payload
            };
        case 'ADD_TO_CART_DISPLAY':
            
            return {
                ...state,
                display: action.payload
            };
        
        case 'GET_SHOWTIME_BY_MOVIE_ID':
            
        return{
            ...state,
            showtime: action.payload
        }
        default:
            return {
                ...state,
            };
    }
}
  