const initialState = {
  movies: [],
  allMovies: [],
  movieDetail: {},
  carousel: [],
  upcoming: [],
  genres: [],
  msg: "Loading...",
};

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_MOVIES":
      let filteredMovies = action.payload.filter((m) => {
        if (m.language === "en" || m.language === "es") {
          return m;
        }
      });

      return {
        ...state,
        movies: filteredMovies,
        allMovies: filteredMovies,
        carousel: filteredMovies.slice(0, 5).map((e) => {
          return {
            _id: e._id,
            title: e.title,
            backdrop_path: `https://image.tmdb.org/t/p/original${e.backdrop_path}`,
          };
        }),
      };

    case "GET_MOVIE_DETAIL":
      return {
        ...state,
        movieDetail: action.payload,
      };

    case "RESET_MOVIE_DETAIL":
      return {
        ...state,
        movieDetail: {},
      };

    case "GET_UPCOMING":
      return {
        ...state,
        upcoming: action.payload,
      };

    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "FILTER_BY_NAME":
      let sortedByName = [...state.movies];

      sortedByName = sortedByName.sort((a, b) => {
        if (a.title > b.title) return action.payload === "ASC" ? -1 : 1;
        if (a.title < b.title) return action.payload === "ASC" ? 1 : -1;
        return 0;
      });

      return {
        ...state,
        movies: sortedByName,
      };

    case "FILTER_BY_RATING":
      let sortedByRating = [...state.movies];

      sortedByRating = sortedByRating.sort((a, b) => {
        if (a.rating > b.rating) return action.payload === "ASC" ? -1 : 1;
        if (a.rating < b.rating) return action.payload === "ASC" ? 1 : -1;
        return 0;
      });

      return {
        ...state,
        movies: sortedByRating,
      };

    case "FILTER_BY_GENRE":
      if (action.payload === "order") {
        return {
          ...state,
          movies: [...state.allMovies],
        };
      } else {
        let filtered = [...state.allMovies];
        filtered = filtered.filter((m) =>
          m.genres.includes(Number(action.payload))
        );

        return {
          ...state,
          movies: filtered,
          msg:
            filtered.length === 0
              ? "There are no movies for this genre"
              : "Loading...",
        };
      }

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
        msg:
          searchResult.length === 0
            ? `There are no results for '${action.payload}'`
            : "Loading...",
      };

    default:
      return {
        ...state,
      };
  }
}
