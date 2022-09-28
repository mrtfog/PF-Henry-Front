import axios from 'axios'


export function getMovies(){

    return async(dispatch)=>{

        try{

            const {data} = await axios.get('http://localhost:8082/api/popular')

            return dispatch({type: 'GET_MOVIES', payload: data })

        }

        catch(e){

            console.log(e)
        }

    }
    
} 

export function getMovieDetail(id){

    return {type: 'GET_MOVIE_DETAIL'}
}