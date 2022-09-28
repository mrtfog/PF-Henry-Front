const initialState = {
  movies:[],
  movieOnDisplay: {},
  filteredMovies: [],
  orderBy: "Select",
  filterBy: "All",
}

export default function rootReducer(state= initialState, action) {
    

    switch(action.type){

        case 'GET_MOVIES': 
            return{
              ...state,
              movies: action.payload

            }

        case 'GET_MOVIE_DETAIL':
            return {
                ...state,
                movieOnDisplay: action.payload
            }


        case 'ORDER_ASC_NAME':
        case "ORDER_ASC_RATING":

            return{
              ...state,
              filteredMovies: action.payload.moviesOrder,
              orderBy: action.payload.name,
            }


        default: 
        return {
            ...state
        }
    }

}