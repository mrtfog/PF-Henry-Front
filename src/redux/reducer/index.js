const initialState = {
  movies:[],
  allMovies: [],
  movieOnDisplay:  {},    
  filteredMovies: [],
}

export default function rootReducer(state= initialState, action) {
    

    switch(action.type){

        case 'GET_MOVIES': 
            return{
              ...state,
              movies: action.payload, 
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
      

          case 'FILTER_BY_NAME':
            let sortedByName = action.payload === 'ASC' ?
                state.movies.sort(function (a,b){
                    if (a.title > b.title) return -1;
                    if (a.title < b.title) return 1;
                    else return 0
                }) :
                state.movies.sort(function (a,b){
                    if (a.title > b.title) return 1;
                    if (a.title < b.title) return -1;
                    else return 0
                })
            return{
                ...state,
                movies: sortedByName
            }

        default: 
        return {
            ...state
        }
    }

}