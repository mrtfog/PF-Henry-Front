import axios from 'axios';

// -------------- MOVIES --------------------------

export function getMovies() {

    return async (dispatch) => {
        try {
            const { data } = await axios.get("https://pf-henry-back.herokuapp.com/api/popular");

            return dispatch({ type: "GET_MOVIES", payload: data });
        } 
        
        catch (e) {
            console.log(e);
        }
    };

}

export function getUpcoming(){

    return async(dispatch)=>{
  
        try{
            const {data} = await axios.get(`https://pf-henry-back.herokuapp.com/api/upcoming`)
    
            return dispatch({type: 'GET_UPCOMING', payload: data})
        }

        catch(e){
            console.log(e)
        }
    }
}


export function getGenre(){

    return async (dispatch) => {

        try{  
            const { data } = await axios('https://pf-henry-back.herokuapp.com/api/genres')
            return dispatch({ type: 'GET_GENRES', payload: data })
        }
        catch (e) {
            console.log(e)
        }
    }
}

// -------------- MOVIE DETAIL -------------------------


export function getMovieDetail(id) {

    return async (dispatch) => {

        try {
            const { data } = await axios.get(`https://pf-henry-back.herokuapp.com/api/${id}`);

            return dispatch({ type: "GET_MOVIE_DETAIL", payload: data });

        } 
        
        catch (e) {
            console.log(e);
        }
    };
}

export function resetMovieDetail(){

    return {type: 'RESET_MOVIE_DETAIL'}
}


//------------------------ SEARCHBAR ------------------------

export function getMoviesByName(payload) {
    return {
      type: 'GET_MOVIE_BY_NAME',
      payload,
    }
}
  
  
//------------------------ FILTERS ------------------------
  
export function sortByRating(payload){
    return {
        type: 'FILTER_BY_RATING',
        payload
    }
}

export function sortByName(payload) {
    return {
        type: 'FILTER_BY_NAME',
        payload,
    };
}

export function sortByGenre(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload,
    }
}