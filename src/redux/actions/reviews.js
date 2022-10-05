import axios from 'axios';

export function getMovieReviews(id){

    return async(dispatch)=>{

        try{

            const { data } = await axios.get(`https://pf-henry-back.herokuapp.com/review/${id}`)

            return dispatch({ type: 'GET_MOVIE_REVIEWS', payload: data })
        }
        catch(e){

            console.log(e)
        }

    }
}

export function postReview(payload){

    return async(dispatch)=>{

        try{
            await axios.post('https://pf-henry-back.herokuapp.com/review/post', payload)
            
            return dispatch({type: 'POST_REVIEW'})
        }
        catch(e){
            console.log(e)
        }
    }
}