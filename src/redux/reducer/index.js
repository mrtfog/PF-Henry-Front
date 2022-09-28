const initialState = {

  movies:[],
  allMovies: [],
  movieOnDisplay:  {}

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

    default: 
      return {
        ...state
      }

  }

}