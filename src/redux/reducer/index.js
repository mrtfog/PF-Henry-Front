const initialState = {
    movies:[],

  movieOnDisplay:  {

    _id:550,
    title:"Fight Club",
    summary: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    rating: 8.4,
    vote_count: 24840,
    duration: 139,
    release_date: "1999-10-15",
    image: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    onCinema: false,
    deleted: false,
    genres: [18]

  },
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
            ...state
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