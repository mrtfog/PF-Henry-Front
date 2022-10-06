const initialState = {    
     cart : [
        {
            _id: "633d84a8454ea464def96467",
            movieId: '550',
            tickets: '3',
            combo: false

        },
        {
            _id: "633f208f2e588110d481ecd6",
            movieId: '616037',
            tickets: '1',
            combo: true
        }
    ]

}
  
export default function showtimesReducer(state = initialState, action) {
    
    switch (action.type) {
        
        case "GET_CART":
            
            return {
                ...state,
            };

        default:
            return {
                ...state,
            };
    }
}
  