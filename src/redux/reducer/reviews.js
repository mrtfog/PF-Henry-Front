
const initialState = {

  movieReviews: []

};

export default function reviewsReducer(state = initialState, action) {
  
    switch (action.type) {

        case 'GET_MOVIE_REVIEWS':

            return{
                ...state,
                movieReviews: action.payload
            }

        case 'POST_REVIEW':

            return{
                ...state
            }

        default:
            return {
                ...state,
            };
    }
}

  