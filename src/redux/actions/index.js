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




// ------------------------------- FILTERS ------------------------------- 

export const orderAsc = (type) => (dispatch, getState) => {
    const filtered = getState().filteredMovies
    let moviesOrder = []

    if( type === 'asc_name'){
        moviesOrder = filtered.sort((a, b) => {
            if(a.title > b.title) return 1
            if(a.title < b.title) return -1
            return 0
        })
    } else if(type === 'asc_rating'){
        moviesOrder = filtered.sort((a, b) => a.rating - b.rating)
    }
    dispatch({
        type: 'ORDER_ASC_RATING',
        payload: {
            moviesOrder,
            name: type,
        }
    })

}