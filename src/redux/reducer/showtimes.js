const initialState = {

    showtimes: [],
    billboard:[]

};
  
export default function showtimesReducer(state = initialState, action) {
    
    switch (action.type) {
  
        case "GET_SHOWTIMES":
            return {
                ...state,
                showtimes: action.payload,
            };

        case 'GET_BILLBOARD_MOVIES':
            let movies = action.payload.map(m=>{return{
                _id: m.id,
                title: m.title,
                summary: m.overview,
                rating: m.vote_average,
                vote_count: m.vote_count,
                duration: m.runtime,
                release_date: m.release_date,
                backdrop_path: m.backdrop_path,
                image: m.poster_path,
                onCinema: true,
                deleted: false,
                genres: m.genre_ids,
                language: m.original_language}
            });

            return{
                ...state,
                billboard: movies
            };
  
        case 'POST_SHOWTIME':
            
            return{
                ...state,
                showtimes: [...state.showtimes, action.payload]
            }
        
        case 'UPDATE_SHOWTIME':
        
            return{
                ...state
            }

        case 'DELETE_SHOWTIME':
            return{
                ...state,
                showtimes: state.showtimes.filter(s=> s._id !== action.payload)
            }

        default:
            return {
                ...state,
            };
    }
}
  