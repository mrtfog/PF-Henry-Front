import axios from 'axios';

export function getAllShowtimes() {

    return async (dispatch) => {

        try {

            const { data } = await axios.get("https://pf-henry-back.herokuapp.com/showtime/getAll");
    
            return dispatch({ type: "GET_SHOWTIMES", payload: data });
        } 
        
        catch (e) {
            console.log(e);
        }
    };
}
  
export function postShowtime(payload){

    return async(dispatch)=>{

        try{

            await axios.post('https://pf-henry-back.herokuapp.com/showtime/post', payload)
            
            return dispatch({type:'POST_SHOWTIME'})
        }
        catch(e){
            console.log(e)
        }

    }

}

export function getBillboardMovies(movies){

    return async(dispatch)=>{

        try{
            const promises = movies.map(async(id) =>{

                let { data } = await axios.get(`https://pf-henry-back.herokuapp.com/api/${id}`)
                return data
            })
    
            let promiseAll = await Promise.all(promises)
    
            return dispatch({type: 'GET_BILLBOARD_MOVIES', payload: promiseAll})
        }

        catch(e){

            console.log(e)
        }

    }
}