import axios from 'axios';


//------------------------ LLAMADOS AL BACK ------------------------

export function getMovies() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("https://pf-henry-back.herokuapp.com/api/popular");

      return dispatch({ type: "GET_MOVIES", payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getMovieDetail(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`https://pf-henry-back.herokuapp.com/api/${id}`);

      return dispatch({ type: "GET_MOVIE_DETAIL", payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getGenre(){
 return async (dispatch) => {
  try{  
    const { data } = await axios('https://pf-henry-back.herokuapp.com/api/genres')
    return dispatch({ type: 'GET_GENRES', payload: data })
  }catch (e) {
    console.log(e)
  }
 }
}


//------------------------ FUNCTION ACTIONS ------------------------

export function getAllFunctions() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("https://pf-henry-back.herokuapp.com/function/getAll");

      return dispatch({ type: "GET_FUNCTIONS", payload: data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function postFunction(payload){
    return async(dispatch)=>{

        try{
            await axios.post('https://pf-henry-back.herokuapp.com/function/post', payload)
            return dispatch({type:'POST_FUNCTION'})
        }
        catch(e){
            console.log(e)
        }

    }
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
