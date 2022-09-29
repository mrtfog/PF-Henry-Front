const initialState = {
  movies: [],
  allMovies: [],
  movieOnDisplay: {},
  functions: [],
  genres: [],
};

export default function rootReducer(state = initialState, action) {
  
  switch (action.type) {

//------------------------ LLAMADOS A LA API ------------------------
    case "GET_MOVIES":
      let filteredMovies = action.payload.filter((m) => {
        if (m.language !== "ko") {
          return m;
        }
      });
      return {
        ...state,
        movies: filteredMovies,
        allMovies: filteredMovies,
      };


    case "GET_MOVIE_DETAIL":
      return {
        ...state,
        movieOnDisplay: action.payload,
      };


    case "GET_MOVIE_BY_NAME":
      let searchResult = action.payload.length
        ? state.allMovies.filter((movie) => {
            return (
              movie.title
                .toUpperCase()
                .includes(action.payload.toUpperCase()) === true
            );
          })
        : state.allMovies;
      return {
        ...state,
        movies: searchResult,
      };

    case 'GET_GENRES': 
      return{
        ...state,
        genres: action.payload
      }


      //------------------------ FILTERS ------------------------
      case 'FILTER_BY_NAME':
        let sortedByName = [ ...state.movies ]

        sortedByName = sortedByName.sort( ( a, b ) => {
                if(a.title > b.title) return action.payload === 'ASC' ? -1 : 1 
                if(a.title < b.title) return action.payload === 'ASC' ? 1 : -1 
                return 0
            }) 
        return{
            ...state,
            movies: sortedByName
        }

        case 'FILTER_BY_RATING':
            let sortedByRating = [ ...state.movies] 
            sortedByRating = sortedByRating.sort( ( a, b ) => {
                if(a.rating > b.rating) return action.payload === 'ASC' ? -1 : 1 
                if(a.rating < b.rating) return action.payload === 'SASC' ? 1 : -1 
                return 0
            }) 
            return{
                ...state,
                movies: sortedByRating,
            }


        case 'FILTER_BY_GENRE': 

        if(action.payload === 'order') {
          return{
            ...state,
            movies: [...state.allMovies]
          }
        }else{
          let filteredMovies = [...state.allMovies]
          filteredMovies = filteredMovies.filter( m => {
            return m.genres.includes(Number(action.payload)) 
          })
          console.log(filteredMovies)
          return{
            ...state,
            movies: filteredMovies
          }
        } 


 //------------------------ FUNCTIONS REDUCERS ------------------------
    case "GET_FUNCTIONS":
      return {
        ...state,
        functions: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
