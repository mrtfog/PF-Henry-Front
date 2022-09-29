const initialState = {
  movies: [],
  allMovies: [],
  movieOnDisplay: {},
  functions: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
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

    case "FILTER_BY_NAME":
      let sortedByName =
        action.payload === "ASC"
          ? state.movies.sort(function (a, b) {
              if (a.title > b.title) return -1;
              if (a.title < b.title) return 1;
              else return 0;
            })
          : state.movies.sort(function (a, b) {
              if (a.title > b.title) return 1;
              if (a.title < b.title) return -1;
              else return 0;
            });
      return {
        ...state,
        movies: sortedByName,
      };
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
