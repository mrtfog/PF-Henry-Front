const initialState = {
  movies:[],
  allMovies: [],
  movieOnDisplay:  {}
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
              allMovies: action.payload  
            }

        case 'GET_MOVIE_DETAIL':
            return {
                ...state,
                movieOnDisplay: action.payload
            }
     
        case 'GET_MOVIE_BY_NAME':
          let searchResult = action.payload.length > 1 ? state.movies.filter(movie => {
          return movie.title.toUpperCase().includes(action.payload.toUpperCase())===true})
          : state.allMovies
          return{
          ...state,
          movies: searchResult
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