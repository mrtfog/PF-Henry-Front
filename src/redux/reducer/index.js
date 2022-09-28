const initialState = {

  movies:[],

  movieOnDisplay:  {}

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

    default: 
      return {
        ...state
      }

  }

}