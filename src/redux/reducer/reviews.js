
const initialState = {

    movieReviews: [],
    websiteReviews: [],
    formDisplay: 'none',
    websiteReviews: [],

};

export default function reviewsReducer(state = initialState, action) {
  
    switch (action.type) {

        case 'GET_MOVIE_REVIEWS':

            return{
                ...state,
                movieReviews: action.payload
            }

        case 'POST_MOVIE_REVIEW':

            return{
                ...state,
                movieReviews: [...state.movieReviews, action.payload]
            }

                
        case 'POST_WEBSITE_REVIEW':

            return{
                ...state,
                websiteReviews: [...state.websiteReviews, action.payload]
            }


        case 'SET_FORM_DISPLAY':

            return{
                ...state,
                formDisplay: action.payload
            }

        case 'GET_WEBSITE_REVIEWS':

            return{
                ...state,
                websiteReviews: action.payload
            }

        default:
            return {
                ...state,
            };
    }
}


  